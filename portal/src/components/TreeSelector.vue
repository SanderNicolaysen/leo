<template>
  <div class="tree-selector has-text-centered">
    <slot></slot>
    <br>
  </div> <!-- ./tree-selector -->
</template>

<script>
export default {
  name: 'TreeSelector',
  props: [
    'initialPage'
  ],
  data () {
    return {
      currentPage: this.initialPage
    };
  },
  created () {
    this.$on('changePage', function (link) {
      this.changePage(link);
    });
  },
  methods: {
    // Change current page to the provided link (page)
    changePage (link) {
      if (link.prev) {
        // Go to previous page
        this.$router.go(-1);
      } else if (link.ext != null) {
        if (link.extInitial == null) {
          // Go to a named view without providing the name of an initial page to see
          this.$router.push({ name: link.ext });
        } else if (link.extInitial != null) {
          // Go to a named view with a provided name of an initial page to see
          this.$router.push({ name: link.ext, params: { page: link.extInitial } });
        }
      } else if (link.loc != null) {
        // Change current 'local' page
        this.currentPage = link.loc;
        // Update URL
        this.$router.push({ name: this.$router.currentRoute.name, params: { page: link.loc } });
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPage = to.params.page;
    }
  }
};
</script>
