<template>
  <div>
    <div class="center-screen">
      <table class="table">
        <tr>
          <th v-for="booth in booths" :key="booth.num">Skranke {{ booth.num }}</th>
        </tr>
        <tr>
          <td v-for="booth in booths" :key="booth.num" :class="{ 'flash': booth.flash }">{{ booth.queueNumber || '-' }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client/dist/socket.io';
export default {
  data: function () {
    return {
      socket: null,
      booths: [
        { num: 1, queueNumber: null, flash: false },
        { num: 2, queueNumber: null, flash: false },
        { num: 3, queueNumber: null, flash: false }
      ],
      queueNumber: 0,
      audioContext: null
    };
  },
  created: function () {
    if (process.env.NODE_ENV === 'development') {
      this.socket = io.connect('http://localhost:8081/queueNumberDisplay');
    } else {
      this.socket = io.connect('/queueNumberDisplay');
    }
    this.socket.on('connect', () => {
      console.log('connected to QND with id: ', this.socket.id);
    });

    this.audioContext = new AudioContext();
  },
  mounted: function () {
    // Update the display when a change occurs
    this.socket.on('display', (booths) => {
      if (booths.length === 0) {
        return;
      }

      booths.forEach(b => {
        const booth = this.booths.find(a => a.num === b.num);
        if (!booth) return;

        // If the new queueNumber is not defined, show a '-' and don't flash
        if (!b.queueNumber) {
          booth.queueNumber = '-';
          return;
        }

        // If there have been a change, flash the corresponding number in yellow for 4 seconds
        if (booth.queueNumber !== b.queueNumber) {
          booth.queueNumber = b.queueNumber;
          booth.flash = true;
          setTimeout(() => { booth.flash = false; }, 4000);
          this.beep();
        }
      });
    });
  },
  methods: {
    beep: function () {
      const o = this.audioContext.createOscillator();
      o.type = 'square';
      o.frequency.value = 200;
      o.connect(this.audioContext.destination);
      o.start();
      setTimeout(() => { o.stop(); }, 350);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variables.scss';

.table th {
  font-size: 5vh;
  text-align: center;
  background: #DDDDEE;
}

.table td {
  font-size: 13vh;
  text-align: center;
  padding: 0.5ch;
  min-width: 5ch;
  color: $white;
  background: $dark-grey;
  border: 1px solid $yellow;
}

.table td.flash {
  background: $yellow;
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
