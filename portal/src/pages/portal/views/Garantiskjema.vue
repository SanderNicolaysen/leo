<template>
  <div class="hero is-fullheight-with-navbar">
    <navbar />
    <div class="hero-body">
      <div class="container">
        <TreeSelector :initialPage="this.$route.params.page">

          <TreeItem pageName="1">
            <TreeInput label="Hva skal du?" type="title" />
            <TreeInput type="boxes">
              <TreeInput :link="{ loc: 'hente' }" label="Hente" type="box" class="is-3" />
              <TreeInput :between="{from: 8, to: 10}" :showException="{day: 6, from: 22, to: 24}" :link="{ ext: 'grabticket' }" label="Levere" type="box" class="is-3" />
              <TreeInput :between="{from: 10, to: 23}" :hideException="{day: 6, from: 22, to: 24}" :link="{ loc: 'leverer-ikke' }" label="Levere" type="box" class="is-3" />
            </TreeInput>

            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="hente">
            <p class="title is-4">Vennligst fyll ut:</p>
            <TreeInput updateKey="dob" label="Fødselsdato" type="date" />

            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
              <TreeInput :link="{ ext: 'grabticket' }" label="Fullfør" class="is-primary" type="button" />
            </TreeInput>
          </TreeItem>

          <TreeItem pageName="leverer-ikke">
            <TreeInput label="Vi godkjenner bare garantiskjema mellom kl 8 og 10. Kom tilbake en annen gang." type="title" />

            <TreeInput type="buttons">
              <TreeInput :link="{ prev: true }" label="Tilbake" type="button" />
              <TreeInput :link="{ ext: 'start' }" label="OK" class="is-primary" type="button" />
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
    if (!this.$inquiry.exists()) {
      this.$inquiry.start('Garantiskjema');
    } else {
      this.$inquiry.update({ type: 'Garantiskjema' });
    }

    const faq = await Faqs.getFaqs('garantiskjema');
    this.faqs = faq;
  }
};
</script>
