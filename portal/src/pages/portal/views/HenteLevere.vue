<template>
  <div>
    <navbar />
    <div class="container">
      <h1 class="title has-text-centered is-uppercase">{{ $t('henteLevere') }}</h1>

    <TreeSelector :initialPage="this.$route.params.page">
        <TreeItem pageName="First">
            <TreeInput label="Hva skal du?" type="title"></TreeInput>
            <TreeInput type="boxes">
                <TreeInput :link="{ loc: 'Second' }" label="Hente" placeholder="HenteTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                <TreeInput :link="{ loc: 'Seventh' }" label="Levere" placeholder="LevereTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
            </TreeInput>
            <TreeInput type="buttons">
                <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
            </TreeInput>
        </TreeItem>
        <TreeItem pageName="Second">
            <TreeInput label="Hva skal du hente?" type="title"></TreeInput>
            <TreeInput type="boxes">
                <TreeInput :link="{ ext: 'pass', extInitial: 'First' }" label="Pass" placeholder="PassTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                <TreeInput :link="{ loc: 'Third' }" inquiryType="HenteBeslag" label="Beslag" placeholder="BeslagTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                <TreeInput :link="{ ext: 'garantiskjema', extInitial: 'Second' }" inquiryType="HenteGarantiskjema" label="Garantiskjema" placeholder="GarantiskjemaTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                <TreeInput :link="{ loc: 'Fifth' }" inquiryType="HenteAnnet" label="Annet" placeholder="AnnetTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
            </TreeInput>
            <TreeInput type="buttons">
                <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
            </TreeInput>
        </TreeItem>
        <TreeItem pageName="Third">
            <TreeInput label="Vet du saksnummer?" type="title"></TreeInput>
            <TreeInput type="boxes">
                <TreeInput :link="{ loc: 'Fourth' }" label="Ja" placeholder="JaTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                <TreeInput :link="{ loc: 'Fifth' }" label="Nei" placeholder="NeiTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
            </TreeInput>
            <TreeInput type="buttons">
                <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
            </TreeInput>
        </TreeItem>
        <TreeItem pageName="Fourth">
            <TreeInput label="Politivakta leverer ikke ut beslag; Kontakt etterforsker." type="title"></TreeInput>
            <TreeInput type="buttons">
                <TreeInput :link="{ ext: 'start' }" label="OK" class="is-link" type="button"></TreeInput>
            </TreeInput>
        </TreeItem>
        <TreeItem pageName="Fifth">
            <TreeInput updateKey="dob" label="Fødselsdato" placeholder="Trykk for å velge.." type="date"></TreeInput>
            <TreeInput type="buttons">
                <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
                <TreeInput :link="{ ext: 'grabticket' }" label="Neste" class="is-link" type="button"></TreeInput>
            </TreeInput>
        </TreeItem>
        <TreeItem pageName="Seventh">
            <TreeInput label="Hva skal du levere?" type="title"></TreeInput>
            <TreeInput type="boxes">
                <TreeInput :between="{from: 8, to: 10}" inquiryType="LevereGarantiskjema" :link="{ ext: 'grabticket' }" label="Garantiskjema" placeholder="GarantiskjemaTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                <TreeInput :between="{from: 10, to: 23}" :link="{ ext: 'garantiskjema', extInitial: 'Third' }" label="Garantiskjema" placeholder="GarantiskjemaTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
                <TreeInput inquiryType="LevereAnnet" :link="{ loc: 'Fifth' }" label="Annet" placeholder="AnnetTekst" src="'/icons/sharp-person.svg'" type="box"></TreeInput>
            </TreeInput>
            <TreeInput type="buttons">
                <TreeInput :link="{ prev: true }" label="Tilbake" class="is-danger" type="button"></TreeInput>
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
    if (!this.$inquiry.exists()) { this.$inquiry.start('HenteLevere'); }

    const faq = await Faqs.getFaqs('henteLevere');
    this.faqs = faq;
  }
};
</script>
