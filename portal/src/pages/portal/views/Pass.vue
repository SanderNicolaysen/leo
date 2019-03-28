<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar />
    <div class="hero-body">
      <div class="container">
      <TreeSelector :initialPage="this.$route.params.page">
        <TreeItem pageName="1">
          <TreeInput :between="{from: 8, to: 16}" :hideException="{day: 2, from: 8, to: 10}" type="section">
            <p class="title is-size-4">Alle passhenvendelser skal til passkontoret, gå tilbake ut døra og til venstre.</p>
            <TreeInput type="buttons">
              <TreeInput :link="{ ext: 'start' }" label="OK" class="is-primary" type="button" />
            </TreeInput>
          </TreeInput>

          <TreeInput :between="{from: 16, to: 23}" :showException="{day:2, from: 8, to: 10}" type="section">
            <TreeInput label="Hva skal du?" type="title" />
            <TreeInput type="boxes">
              <TreeInput inquiryType="Hente ferdig pass" :link="{ loc: '2' }" label="Hente ferdig pass" type="box" class="is-3" @click.native="startInquiry()" />
              <TreeInput inquiryType="Nødpass" :link="{ ext: 'grabticket' }" label="Få nødpass" type="box" class="is-3" />
            </TreeInput>
            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            </TreeInput>
          </TreeInput>
        </TreeItem>

        <TreeItem pageName="2">
          <TreeInput updateKey="dob" label="Fødselsdato" placeholder="DDMMYY" type="text" />
          <TreeInput type="buttons">
            <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            <TreeInput :link="{ loc: '3' }" label="Neste" class="is-primary" type="button" />
          </TreeInput>
        </TreeItem>

        <TreeItem pageName="3">
          <TreeInput updateKey="fname" label="Fornavn" type="text" />
          <TreeInput updateKey="lname" label="Etternavn" type="text" />
          <TreeInput type="buttons">
            <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            <TreeInput :link="{ ext: 'grabticket' }" label="Neste" class="is-primary" type="button" />
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
    const faq = await Faqs.getFaqs('pass');
    this.faqs = faq;
  },
  methods: {
    startInquiry () {
      if (this.$inquiry.exists()) return;

      // Start a new inquiry
      this.$inquiry.start('Pass');
    }
  }
};
</script>
