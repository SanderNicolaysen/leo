<template>
  <div class="section has-text-centered">

    <h1 class="title">{{ $t('taKølapp') }}</h1>

    <img :src="`${publicPath}svg/grabticket.svg`" alt="ticketIllustration">

  </div>
</template>

<script>
export default {
  name: 'grabticket',
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  created () {
    setTimeout(() => { this.$router.push({ name: 'start' }) }, 5000)
  }
}
</script>
