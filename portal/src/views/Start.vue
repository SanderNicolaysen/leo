<template>
  <div class="section">
    <StartButton />

    <!-- Shows the nodejs servers test API response -->
    <p id="id1">Test backend API: "{{ testText }}"</p>
  </div>
</template>

<script>
// @ is an alias to /src, Example:
import StartButton from '@/components/StartButton.vue'

import TestService from '@/services/TestService.js'

export default {
  name: 'start',
  data: function () {
    return {
      testText: ''
    }
  },
  mounted: function () {
    let self = this

    // Do a GET request on the test API
    TestService.test().then(function (response) {
      self.testText = response.data.text
    })
  },
  components: {
    StartButton
  }
}
</script>
