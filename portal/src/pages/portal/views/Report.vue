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
              <TreeInput :link="{ loc: '3' }" label="Ja" type="box" class="is-3" @click.native="identifyOffender = true" />
              <TreeInput :link="{ loc: '3' }" label="Nei" type="box" class="is-3" @click.native="identifyOffender = false" />
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
              <TreeInput label="Mobiltelefon" type="box" class="is-3" @click.native="item = 'phone'" />
              <TreeInput label="Bil" type="box" class="is-3" @click.native="item = 'car'" />
              <TreeInput label="Sykkel" type="box" class="is-3" @click.native="item = 'bicycle'" />
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
      identifyOffender: null,
      item: null
    };
  },
  created: async function () {
    // Start a new inquiry
    if (!this.$inquiry.exists()) { this.$inquiry.start('Tyveri/skadeverk'); }

    const faq = await Faqs.getFaqs('tyveri-og-skadeverk');
    this.faqs = faq;
  },
  computed: {
    form: function () {
      switch ([ this.behalfOf, this.identifyOffender, this.item ].join(' ')) {
        case 'me true phone':
        case 'me false phone': return 'anmelde-mobil';
        case 'me true car': return 'anmelde-bil';
        case 'me true bicycle': return 'anmelde-sykkel';
        default: return null;
      }
    }
  }
};
</script>

<style>

</style>
