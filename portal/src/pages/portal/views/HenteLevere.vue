<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar />
    <div class="hero-body">
      <div class="container">
        <TreeSelector :initialPage="this.$route.params.page">
          <TreeItem pageName="1">
            <TreeInput label="Hva skal du?" type="title"></TreeInput>
            <TreeInput type="boxes">
              <TreeInput :link="{ loc: '2' }" class="is-2" label="Hente" type="box" />
              <TreeInput :link="{ loc: '6' }" class="is-2" label="Levere" type="box" />
            </TreeInput>

            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="2">
            <TreeInput label="Hva skal du hente?" type="title" />
            <TreeInput type="boxes">
              <TreeInput :link="{ ext: 'pass', extInitial: '1' }" label="Pass" type="box" />
              <TreeInput :link="{ loc: '3' }" inquiryType="Hente/Beslag" label="Beslag" type="box" />
              <TreeInput :link="{ ext: 'garantiskjema', extInitial: 'hente' }" label="Garantiskjema" type="box" />
              <TreeInput :link="{ loc: '5' }" inquiryType="Hente/Annet" label="Annet" type="box" />
            </TreeInput>
            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="3">
            <TreeInput label="Vet du saksnummer?" type="title" />
            <TreeInput type="boxes">
              <TreeInput :link="{ loc: '4' }" label="Ja" type="box" class="is-2" />
              <TreeInput :link="{ loc: '5' }" label="Nei" type="box" class="is-2"  />
            </TreeInput>
            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="4">
            <TreeInput label="Politivakta leverer ikke ut beslag; Kontakt etterforsker." type="title" />
            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
              <TreeInput :link="{ ext: 'start' }" label="OK" class="is-primary" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="5">
            <TreeInput label="Dine personopplysninger" type="title" />

            <TreeInput updateKey="lname" :label="$t('etternavn')" type="text" />
            <TreeInput updateKey="dob" :label="$t('fødselsdato')" type="date" />
            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
              <TreeInput :link="{ ext: 'grabticket' }" label="Fullfør" class="is-primary" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="6">
            <TreeInput label="Hva skal du levere?" type="title" />
            <TreeInput type="boxes">
              <TreeInput :between="{from: 8, to: 10}" :link="{ ext: 'grabticket' }" label="Garantiskjema" type="box" class="is-2" />
              <TreeInput :between="{from: 10, to: 23}" :link="{ ext: 'garantiskjema', extInitial: 'leverer-ikke' }" label="Garantiskjema" type="box" class="is-2" />
              <TreeInput inquiryType="Levere/Annet" :link="{ loc: '5' }" label="Annet" type="box" class="is-2" />
            </TreeInput>
            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            </TreeInput>
          </TreeItem>

        </TreeSelector>
      </div>
    </div>
    <div class="hero-footer">
      <div class="container">
        <Faq :items="faqs" />
      </div>
    </div>
  </div>
</template>

<script>
import Faq from '@/components/Faq.vue';

import Faqs from '@/services/Faqs.js';

export default {
  components: {
    Faq
  },
  data () {
    return {
      faqs: []
    };
  },
  created: async function () {
    // Start a new inquiry
    if (!this.$inquiry.exists()) { this.$inquiry.start('Hente/Levere'); }

    const faq = await Faqs.getFaqs('henteLevere');
    this.faqs = faq;
  }
};
</script>
