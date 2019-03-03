<template>
<div>
  <navbar />
  <div class="container">
    <h1 class="title has-text-centered is-uppercase">{{ $t('hittegods') }}</h1>
    <p class="subtitle has-text-centered">{{ $t('hittegodsTekst') }}</p>

    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><router-link to="/lost-found">Hittegods og beslag</router-link></li>
        <li class="is-active"><router-link to="/lost-found">Beskrivelse av hittegods/beslag</router-link></li>
      </ul>
    </nav>
    <progress class="progress is-link" value="30" max="100">30%</progress>
    <hr>

    <!-- velg alternativ/input  -->
    <div class="columns">
      <div class="column">
        <article class="message is-dark">
          <div class="message-body">
           <div class="field">
              <label class="label" for="descriptionInput">Hvilken gjenstand skal du levere?</label>
              <div class="control">
                <input id="descriptionInput" class="input" type="text" placeholder="Input">
              </div>
              <div class="control">
                <button class="button">Velg</button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message is-primary">
          <div class="message-header">
            <p>Info</p>
          </div>
          <div class="message-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
          </div>
        </article>
      </div>
    </div>

    <div class="block has-text-centered">
        <router-link to="/grabticket"><button class="button is-success is-size-5 is-uppercase">{{ $t('trekkKølapp') }}</button></router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'lostFoundDescription',
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>