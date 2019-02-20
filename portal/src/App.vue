<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">

</style>

<script>
import i18n from './lang/i18n'

export default {
  name: 'app',
  methods: {
    changeLocale (locale) {
      i18n.locale = locale
    }
  }
}
</script>
