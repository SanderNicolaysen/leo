<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar />
    <div class="hero-body">
      <div class="container">
        <TreeSelector initialPage="1">

          <TreeItem pageName="1">
            <h2 class="title is-3">Velg kategori</h2>

            <TreeInput type="boxes">
              <TreeInput :link="{ loc: 'avhor' }" class="is-2" label="Avhør" type="box" />
              <TreeInput :link="{ loc: 'annet' }" class="is-2" label="Annet" type="box" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="avhor">
            <h1 class="title is-3">Vennligst fyll ut</h1>

            <TreeInput updateKey="lname" :label="$t('etternavn')" type="text" />
            <TreeInput updateKey="dob" :label="$t('fødselsdato')" type="text" />

            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
              <TreeInput :link="{ ext: 'grabticket' }" label="Fullfør" class="is-primary" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="annet">
            <h1 class="title is-3">Vennligst fyll ut</h1>

            <TreeInput updateKey="lname" :label="$t('etternavn')" type="text" />
            <TreeInput updateKey="dob" :label="$t('fødselsdato')" type="text" />
            <TreeInput updateKey="casenumber" :label="$t('saksnummer')" type="text" />

            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
              <TreeInput :link="{ ext: 'grabticket' }" label="Fullfør" class="is-primary" type="button" />
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
      faqs: [],
      title: '',
      date: new Date(),
      appointment: {
        type: undefined,
        surname: '',
        birth: '',
        caseNumber: ''
      }
    };
  },
  created: async function () {
    // Start a new inquiry
    if (!this.$inquiry.exists()) {
      this.$inquiry.start('Avtale');
    }

    const faq = await Faqs.getFaqs('avtale');
    this.faqs = faq;
  }
};
</script>
