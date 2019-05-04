<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar />
    <div class="hero-body">
      <div class="container">
        <TreeSelector initialPage="1">

          <TreeItem pageName="1">
            <h2 class="title is-3">Velg kategori</h2>

            <TreeInput type="boxes">
              <TreeInput inquiryType="Avtale/Avhør" :link="{ loc: 'avhor' }" class="is-2" label="Avhør" type="box" />
              <TreeInput inquiryType="Avtale" :link="{ loc: 'annet' }" class="is-2" label="Annet" type="box" />
            </TreeInput>

            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="avhor">
            <h1 class="title is-3">Dine personopplysninger</h1>

            <TreeInput updateKey="lname" :label="$t('etternavn')" type="text" />
            <TreeInput updateKey="dob" :label="$t('fødselsdato')" type="date" />

            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
              <TreeInput :link="{ ext: 'grabticket' }" label="Fullfør" class="is-primary" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="annet">
            <h1 class="title is-3">Dine personopplysninger</h1>
            <TreeInput updateKey="lname" :label="$t('etternavn')" type="text" />
            <TreeInput updateKey="dob" :label="$t('fødselsdato')" type="date" />
            <TreeInput updateKey="caseNumber" :label="$t('saksnummer')" type="number" />

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

    const faq = await Faqs.getFaqs('Avtale');
    this.faqs = faq;
  }
};
</script>
