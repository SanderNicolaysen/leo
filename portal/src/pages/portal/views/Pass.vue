<template>
  <div>
    <navbar />
    <div class="container">
      <h1 class="title has-text-centered is-uppercase">{{ $t('pass') }}</h1>

      <TreeSelector :initialPage="this.$route.params.initialPage">
        <TreeItem pageName="First">
          <TreeInput :between="{from: 8, to: 16}" :hideException="{day: 2, from: 8, to: 10}" type="section">
            <TreeInput label="Du er på feil sted!" type="title"></TreeInput>
            <TreeInput type="buttons">
              <TreeInput :link="{ ext: 'start' }" label="OK" class="is-link" type="button"></TreeInput>
            </TreeInput>
          </TreeInput>
          <TreeInput :between="{from: 16, to: 23}" :showException="{day:2, from: 8, to: 10}" type="section">
            <TreeInput label="Hva skal du?" type="title"></TreeInput>
            <TreeInput type="boxes">
              <TreeInput inquiryType="HenteFerdigPass" :link="{ loc: 'Second' }" label="Hente ferdig pass" placeholder="PassTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
              <TreeInput inquiryType="SkaffeNødpass" :link="{ ext: 'grabticket' }" label="Skaffe nødpass" placeholder="PassTekst2" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
            </TreeInput>
            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
            </TreeInput>
          </TreeInput>
        </TreeItem>
        <TreeItem pageName="Second">
          <TreeInput updateKey="dob" label="Fødselsdato" placeholder="Trykk for å velge.." type="date"></TreeInput>
          <TreeInput type="buttons">
            <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
            <TreeInput :link="{ loc: 'Third' }" label="Neste" class="is-link" type="button"></TreeInput>
          </TreeInput>
        </TreeItem>
        <TreeItem pageName="Third">
          <TreeInput updateKey="fname" label="Fornavn" placeholder="Fornavn" type="text"></TreeInput>
          <TreeInput updateKey="lname" label="Etternavn" placeholder="Etternavn" type="text"></TreeInput>
          <TreeInput type="buttons">
            <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
            <TreeInput :link="{ ext: 'grabticket' }" label="Neste" class="is-link" type="button"></TreeInput>
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
    if (!this.$inquiry.exists()) { this.$inquiry.start('Pass'); }

    const faq = await Faqs.getFaqs('pass');
    this.faqs = faq;
  }
};
</script>
