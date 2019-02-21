<template>
  <div class="section has-text-centered">

    <h1 class="title">{{ $t('taKølapp') }}</h1>

    <object class="grabticket" id="grabticket" data="/svg/grabticket.svg" type="image/svg+xml">grabticket illustration</object>

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
    let svgObj = document.getElementsByClassName('grabticket')[0]
    svgObj.addEventListener('load', this.runAnimationAndPush, false)
  },
  methods: {
    runAnimationAndPush: function () {
      let svgObj = document.getElementsByClassName('grabticket')[0]
      const self = this
      const svgDoc = svgObj.contentDocument
      var tl = Anime.timeline({
        loop: 2,
        complete: function (anim) {
          self.$router.push({ name: 'start' })
        }
      })

      tl.add({
        targets: svgDoc.querySelector('#ticketpath'),
        keyframes: [
          { d: 'm65 104v110l78 0v-110z', duration: 500, easing: 'linear' },
          { translateY: 50, easing: 'easeInOutSine', duration: 500, delay: 500 },
          { delay: 500 }
        ]

      }, 500)

      tl.add({
        targets: [svgDoc.querySelector('#thumb'), svgDoc.querySelector('#fingers')],
        translateY: 50,
        duration: 500,
        easing: 'easeInOutSine'
      }, 1500)
    }
  }
}
</script>
