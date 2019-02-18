<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <span class="icon">
          <i v-bind:class="icon"></i>
        </span>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ title }}</strong>
            <br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
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
    }
  }
}
</script>
