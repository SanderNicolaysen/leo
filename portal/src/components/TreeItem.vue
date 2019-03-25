<template>
  <div v-if="visible" class="tree-item">
    <slot></slot>
  </div> <!-- ./tree-item -->
</template>

<script>
export default {
  name: 'TreeItem',
  props: [
    'pageName'
  ],
  data () {
    return {
    };
  },
  created () {
    this.$on('changePage', function (link) {
      this.$parent.$emit('changePage', link);
    });
  },
  computed: {
    // Determine if this TreeItem should be visible
    visible: function () {
      // If this page (TreeItem) is the currentPage it should be visible
      if (this.pageName === this.$parent.currentPage) {
        return true;
      }

      return false;
    }
  }
};
</script>
