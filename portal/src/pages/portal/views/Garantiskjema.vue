<template>
  <div>
    <navbar />
    <div class="container">
      <h1 class="title has-text-centered is-uppercase">{{ $t('garantiskjema') }}</h1>

        <TreeSelector :initialPage="this.$route.params.page">
            <TreeItem pageName="First">
                <TreeInput label="Hva skal du?" type="title"></TreeInput>
                <TreeInput type="boxes">
                    <TreeInput inquiryType="HenteGarantiskjema" :link="{ loc: 'Second' }" label="Hente" placeholder="HenteTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                    <TreeInput :between="{from: 8, to: 10}" :showException="{day: 6, from: 22, to: 24}" inquiryType="LevereGarantiskjema" :link="{ ext: 'grabticket' }" label="Levere" placeholder="LevereTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                    <TreeInput :between="{from: 10, to: 23}" :hideException="{day: 6, from: 22, to: 24}" :link="{ loc: 'Third' }" label="Levere" placeholder="LevereTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                </TreeInput>
                <TreeInput type="buttons">
                    <TreeInput :link="{ ext: 'start' }" label="Tilbake" class="is-danger" type="button"></TreeInput>
                </TreeInput>
            </TreeItem>
            <TreeItem pageName="Second">
                <TreeInput updateKey="dob" label="Fødselsdato" placeholder="Trykk for å velge.." type="date"></TreeInput>
                <TreeInput type="buttons">
                    <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
                    <TreeInput :link="{ ext: 'grabticket' }" label="Neste" class="is-link" type="button"></TreeInput>
                </TreeInput>
            </TreeItem>
            <TreeItem pageName="Third">
                <TreeInput label="Bort!" type="title"></TreeInput>
                <TreeInput type="buttons">
                    <TreeInput :link="{ ext: 'start' }" label="OK" class="is-link" type="button"></TreeInput>
                </TreeInput>
            </TreeItem>
        </TreeSelector>

        <Faq :items="faqs"/>

        <br>
        <div class="block has-text-centered">
            <router-link to="/grabticket"><button class="button is-success is-size-4 is-uppercase">{{ $t('trekkKølapp') }}</button></router-link>
        </div>
    </div>
  </div>
</template>

<script>
import Faq from '@/components/Faq.vue';
import TreeSelector from '@/components/TreeSelector.vue';
import TreeItem from '@/components/TreeItem.vue';
import TreeInput from '@/components/TreeInput.vue';

import Faqs from '@/services/Faqs.js';

export default {
  components: {
    Faq,
    TreeSelector,
    TreeItem,
    TreeInput
  },
  data () {
    return {
      faqs: []
    };
  },
  created: async function () {
    // Start a new inquiry
    if (!this.$inquiry.exists()) { this.$inquiry.start('Garantiskjema'); }

    const faq = await Faqs.getFaqs('garantiskjema');
    this.faqs = faq;
  }
};
</script>
