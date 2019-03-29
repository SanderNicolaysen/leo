<template>
  <div class="box card--hover">
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
.box {
  height: 100%;
}

/* Copied from vuetify's hover effect, https://vuetifyjs.com/en/components/hover */
.card--hover {
    cursor: pointer;
    -webkit-transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    -webkit-transition-property: -webkit-box-shadow;
    transition-property: -webkit-box-shadow;
    transition-property: box-shadow;
    transition-property: box-shadow, -webkit-box-shadow;
}

.card--hover:hover {
    -webkit-box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
}
</style>
