<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar />
    <div class="hero-body">
      <div class="container">
        <TreeSelector initialPage="1">

          <TreeItem pageName="1">
            <p class="title is-4">Skal du anmelde på vegne av ...</p>
            <TreeInput type="boxes">
              <TreeInput :link="{ loc: '2' }" label="Meg selv" type="box" @click.native="behalfOf = 'me'" />
              <TreeInput :link="{ loc: '2' }" label="Et firma/en organisasjon" type="box" @click.native="behalfOf = 'org'" />
              <TreeInput :link="{ loc: '2' }" label="Andre" type="box" @click.native="behalfOf = 'other'" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="2">
            <p class="title is-4">Vet du hvem gjerningspersonen er, <br> eller kan identifisere gjerningspersonen?</p>

            <TreeInput type="boxes">
              <TreeInput :link="{ ext: 'grabticket' }" label="Ja" type="box" class="is-3" />
              <TreeInput :link="{ loc: '3' }" label="Nei" type="box" class="is-3" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="3">
            <p class="title is-4">Velg kategori</p>

            <TreeInput type="boxes">
              <TreeInput :link="{ loc: '4' }" label="Tyveri" type="box" class="is-3" />
              <TreeInput :link="{ ext: 'grabticket' }" label="Annet" type="box" class="is-3" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="4">
            <p class="title is-4">Jeg skal anmelde tyveri av ...</p>

            <TreeInput type="boxes">
              <TreeInput label="Mobiltelefon" type="box" class="is-3" @click.native="item = 'telefon'" />
              <TreeInput label="Bil" type="box" class="is-3" @click.native="item = 'bil'" />
              <TreeInput label="Sykkel" type="box" class="is-3" @click.native="item = 'sykkel'" />
              <TreeInput :link="{ ext: 'grabticket' }" label="Annet" type="box" class="is-3" />
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
      behalfOf: null,
      item: null
    };
  },
  created: async function () {
    // Start a new inquiry
    if (!this.$inquiry.exists()) { this.$inquiry.start('Anmeldelse'); }

    const faq = await Faqs.getFaqs('tyveri-og-skadeverk');
    this.faqs = faq;
  },
  methods: {
    async gotoForm () {
      let forms = [];

      forms.push('personopplysninger');

      if (this.behalfOf === 'org') forms.push('firma');
      if (this.behalfOf === 'other') forms.push('fornermede');

      forms.push(this.item);
      console.log(forms);

      await this.$inquiry.setForms(forms.join(','));

      this.$router.push({ name: 'forms', params: { name: forms[0], page: 0 } });
    }
  },
  watch: {
    item: function () {
      this.gotoForm();
    }
  }
};
</script>

<style>

</style>
