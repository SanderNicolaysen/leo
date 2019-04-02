<template>
  <section>
    <b-modal :active.sync="showModal" :width="640" :canCancel=false>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">Kønummer: {{ id }}</p>
        </header>

        <section class="modal-card-body">
          <p>Informasjonen du har fylt inn er nok. <br> Vennligst press knappen "Trekk kølapp" og møt politiet innenfor
            døren.</p>
        </section>

        <footer class="modal-card-foot">
          <div class="block">
            <router-link :to="{ name: 'grabticket' }"><button class="button is-success is-size-4 is-uppercase" @click="changeModal()">{{ $t('trekkKølapp') }}</button></router-link>
          </div>
        </footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  name: 'InformUserModal',
  props: ['showModal', 'id'],
  methods: {
    changeModal: function () {
      this.$parent.showModal = false;
    }
  }
};
</script>
