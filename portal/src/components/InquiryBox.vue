<template>
  <div class="box" v-bind:class="{ 'has-background-grey-lighter': active === inquiry.inquiry_id}">
    <div class="columns">
      <div class="column">
        <p class="is-size-5"> {{ inquiry.gender }} </p>
      </div>
      <div class="column is-one-quarter is-size-3 has-text-right">
        #{{ inquiry.inquiry_id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['inquiry', 'active']
}
</script>
