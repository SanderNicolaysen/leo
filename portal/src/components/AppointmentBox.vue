<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">
        Avtale
      </p>
      <span class="card-header-icon">
        <button class="delete" @click="handleClick(appointment)"></button>
      </span>
    </div>
    <div class="card-content">
      <div class="content">
        <table class="table is-fullwidth">
          <tr>
            <td>Etterforsker:</td>
            <td>{{appointment.hostName}}</td>
          </tr>
          <tr>
            <td>Bruker:</td>
            <td>{{appointment.userName}}</td>
          </tr>
          <tr>
            <td>Fødselsdato:</td>
            <td>{{appointment.userBirth}}</td>
          </tr>
          <tr>
            <td>Saksnummer:</td>
            <td>{{appointment.caseNumber}}</td>
          </tr>
          <tr>
            <td>Dato:</td>
            <td>{{appointment.date}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['appointment'],
  methods: {
    handleClick: function (appointment) {
      this.$emit('delete', appointment);
    }
  }
};
</script>
