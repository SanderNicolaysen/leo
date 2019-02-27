<template>
  <div class="box">
    <article class="media">
      <div class="media-left" v-if="icon">
        <span class="icon is-large" v-html="icon"></span>
      </div>
      <div class="media-content">
        <div class="content">
          <h4>{{ title }}</h4>
          <p>{{ text }}</p>
        </div>
      </div>
    </article>
  </div> <!-- ./box -->
</template>

<script>
export default {
  name: 'Box',
  props: [
    'title',
    'text',
    'icon'
  ],
  data () {
    return {
    };
  }
};
</script>

<style scoped>
.box:hover {
  background-color: lavender;
  cursor: pointer;
}

.box {
  height: 100%;
}
</style>
