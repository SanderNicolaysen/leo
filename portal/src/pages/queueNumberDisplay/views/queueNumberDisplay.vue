<template>
<div>
  <p>hei</p>
</div>
</template>

<script>
import io from 'socket.io-client/dist/socket.io';
export default {
  data () {
    return {
      socket: null
    };
  },
  created () {
    this.socket = io();
  }
};
</script>
