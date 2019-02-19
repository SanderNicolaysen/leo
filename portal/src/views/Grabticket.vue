<template>
  <div class="section has-text-centered">

    <h1 class="title">{{ $t('taKølapp') }}</h1>

    <img class="hand_fingers layeredimg" :src="`${publicPath}svg/grabticket/hand_fingers.svg`" alt="ticketIllustration">
    <img class="hand_thumb layeredimg" :src="`${publicPath}svg/grabticket/hand_thumb.svg`" alt="ticketIllustration">
    <img class="port_bottom layeredimg" :src="`${publicPath}svg/grabticket/port_bottom.svg`" alt="ticketIllustration">
    <img class="port_top layeredimg" :src="`${publicPath}svg/grabticket/port_top.svg`" alt="ticketIllustration">
    <img class="ticket layeredimg" :src="`${publicPath}svg/grabticket/ticket.svg`" alt="ticketIllustration">

  </div>
</template>

<script>
import Anime from 'animejs'

export default {
  name: 'grabticket',
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  mounted () {
    var tl = Anime.timeline()

    tl.add({
      targets: '.ticket',
      keyframes: [
        {translateY: 150, duration: 500},
        {translateY: 250, easing: 'easeInOutSine', duration: 500, delay: 500}
      ],
      easing: 'linear'
    }, 500)

    tl.add({
      targets: '.hand_fingers, .hand_thumb',
      direction: 'alternate',
      translateY: 100,
      easing: 'easeInOutSine',
      duration: 500
    }, 1500)

    setTimeout(() => { this.$router.push({ name: 'start' }) }, 5000)
  }
}
</script>

<style lang="scss">
@import "../assets/sass/grabticket.scss";
</style>
