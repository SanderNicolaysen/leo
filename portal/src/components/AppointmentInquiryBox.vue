<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">
        Henvendelse
      </p>
    </div>
    <div class="card-content">
      <div class="content">
        <table class="table is-fullwidth">
          <tr>
            <td>Type:</td>
            <td>{{inquiry.appointment.type}}</td>
          </tr>
          <tr>
            <td>Bruker:</td>
            <td>{{inquiry.appointment.surname}}</td>
          </tr>
          <tr>
            <td>Fødselsdato:</td>
            <td>{{inquiry.appointment.birth}}</td>
          </tr>
          <tr>
            <td>Saksnummer:</td>
            <td>{{inquiry.appointment.caseNumber}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['inquiry']
};
</script>
