<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">
        Henvendelse
      </p>
      <button class="delete" aria-label="delete" @click="handleClick(inquiry)"></button>
    </div>
    <div class="card-content">
      <div class="content">
        <table class="table is-fullwidth">
          <tr>
            <td>Type:</td>
            <td>{{appointment('type')}}</td>
          </tr>
          <tr>
            <td>Bruker:</td>
            <td>{{appointment('lname')}}</td>
          </tr>
          <tr>
            <td>Fødselsdato:</td>
            <td>{{appointment('dob')}}</td>
          </tr>
          <tr>
            <td>Saksnummer:</td>
            <td>{{appointment('caseNumber')}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['inquiry'],
  methods: {
    handleClick: function (inquiry) {
      this.$emit('delete', inquiry);
    },
    appointment (attr) {
      return (typeof this.inquiry[attr] !== 'undefined') ? this.inquiry[attr] : '';
    }
  }
};
</script>
