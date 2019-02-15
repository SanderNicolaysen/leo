<template>
<div class="wrapper">
  <!-- NAVBAR -->
  <nav class="navbar block" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="../assets/icons/politilogo.jpg" width="38" height="35">
      </a>
      <span role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>

    <div id="navMenu" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item is-uppercase is-size-3 has-text-gret-dark">POLITIVAKTA</a>
      </div>

      <div class="navbar-end">
        <a class="navbar-item">
          <img src="../assets/icons/norway.svg" alt="country-Norway" width="50" height="60">
        </a>
        <a class="navbar-item">
          <img src="../assets/icons/uk.svg" alt="country-UK" width="50" height="60">
        </a>
      </div>
    </div>

  </nav>
  <!-- ./NAVBAR -->

  <div class="container">
    <div class="block has-text-centered">
      <button class="button is-success is-size-2 is-uppercase">Trekk kølapp</button>
    </div>

    <div class="notification is-info">
      <button class="delete"></button>
      <p class="has-text-centered is-size-5">Eller, gjør noen steg selv slik at vi kan hjelpe deg raskere! <br>
        Begynn med å velge henvedelse under</p>
    </div>

    <div class="columns">
      <div class="column">
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
                  <strong>Pass</strong>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
                  egestas. Nullam condimentum luctus turpis.
                </p>
              </div>
            </div>

          </article>
        </div> <!-- ./box -->
      </div>
      <div class="column">
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
                  <strong>Anmelde tyveri eller skadeverk</strong>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
                  egestas. Nullam condimentum luctus turpis.
                </p>
              </div>
            </div>

          </article>
        </div> <!-- ./box -->
      </div>
      <div class="column">
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
                  <strong>Hente beslag</strong>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
                  egestas. Nullam condimentum luctus turpis.
                </p>
              </div>
            </div>

          </article>
        </div> <!-- ./box -->
      </div>
    </div>

    <div class="columns">
      <div class="column">
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
                  <strong>Bot</strong>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
                  egestas. Nullam condimentum luctus turpis.
                </p>
              </div>
            </div>

          </article>
        </div> <!-- ./box -->
      </div>
      <div class="column">
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
                  <strong>Våpen</strong>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
                  egestas. Nullam condimentum luctus turpis.
                </p>
              </div>
            </div>

          </article>
        </div> <!-- ./box -->
      </div>
      <div class="column">
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
                  <strong>Avhør</strong>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
                  egestas. Nullam condimentum luctus turpis.
                </p>
              </div>
            </div>

          </article>
        </div> <!-- ./box -->
      </div>
    </div>
  </div>
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

<style lang="scss">
@import "../assets/sass/homepage.scss";
</style>
