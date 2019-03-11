<template>
<div>
  <div class="queueNumber center-screen">{{ queueNumber }}</div>
</div>
</template>

<script>
import io from 'socket.io-client/dist/socket.io';
export default {
  data () {
    return {
      socket: null,
      queueNumber: 0
    };
  },
  created () {
    this.socket = io.connect('http://localhost:8081/queueNumberDisplay');
  },
  mounted () {
    this.socket.on('kall inn', function (msg) {
    this.queueNumber = msg;
    console.log(msg);
    }.bind(this));
  }
};
</script>

<style scoped>
.queueNumber {
  font-size: 6rem;
}

.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>
