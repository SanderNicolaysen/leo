<template>
  <div class="wrapper">
    <router-view />
    <InformUserModal :showModal="showModal" :id='id'/>
  </div>
</template>

<style lang="scss">

</style>

<script>
import io from 'socket.io-client/dist/socket.io';
import InformUserModal from '@/components/InformUserModal';

export default {
  name: 'app',
  components: {
    InformUserModal
  },
  data () {
    return {
      boothSocket: null,
      showModal: false,
      id: null
    };
  },
  created: function () {
    if (process.env.NODE_ENV === 'development') {
      this.boothSocket = io.connect('http://localhost:8081/booth');
    } else {
      this.boothSocket = io.connect('/booth');
    }

    this.boothSocket.on('inform user', function (id) {
      if (id === this.$inquiry.get().inquiry_id) {
        this.showModal = true;
        this.id = id;
      }
    }.bind(this));
  }
};
</script>
