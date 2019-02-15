<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <span class="icon">
          <i class="fas fa-passport is-size-3"></i>
        </span>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ title }}</strong>
            <br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
            egestas. Nullam condimentum luctus turpis.
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
    'text'
  ],
  data () {
    return {
    }
  }
}
</script>
