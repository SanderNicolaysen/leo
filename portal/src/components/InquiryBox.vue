<template>
  <div class="card" v-bind:class="{ 'has-background-grey-lighter': active === inquiry.inquiry_id}">
    <div class="card-header">
      <p class="card-header-title">
        <b-icon v-if="inquiry.priority==='urgent'" icon="alert" type="is-danger"></b-icon>
        Kategori: {{ safeAttribute('type', 'ukjent') }}
      </p>
      <a class="card-header-icon">
        <span class="icon">
          <b-tooltip label="Trykk for å behandle denne henvendelsen">
            <i class="mdi mdi-arrow-expand-up" @click="$emit('selected')"></i>
          </b-tooltip>
        </span>
      </a>
    </div>
    <div class="card-content">
      <div class="content">
        <table class="table is-fullwidth">
          <tr>
            <td>FDato/Personnr:</td>
            <td>{{ safeAttribute('NIN', fallback=safeAttribute('dob')) }}</td>
          </tr>
          <tr v-if="safeAttribute('forms') && inquiry.forms.length > 0">
            <td>Skjema:</td>
            <td><a @click="isModalActive = true">Klikk for å forhåndsvise</a></td>
          </tr>
          <tr v-if="safeAttribute('lname')">
            <td>Etternavn:</td>
            <td>{{ safeAttribute('lname') }}</td>
          </tr>
          <tr v-if="safeAttribute('caseNumber')">
            <td>Saksnummer:</td>
            <td>{{ safeAttribute('caseNumber') }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-item has-text-left">
        <div class="content">
          <StatusIndicator :status="inquiry.status" />
        </div>
      </div>
      <div class="card-footer-item">
        <div class="content">
          <p class="is-1">
            Kønummer: <strong> #{{ safeAttribute('inquiry_id') }}</strong>
          </p>
        </div>
      </div>
      <b-modal :active.sync="isModalActive">
        <FormModal :forms="inquiry.forms" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import StatusIndicator from '@/components/StatusIndicator.vue';
import FormModal from '@/components/FormModal.vue';

export default {
  props: ['inquiry', 'active'],
  data: function () {
    return {
      isModalActive: false
    };
  },
  components: {
    StatusIndicator,
    FormModal
  },
  methods: {
    safeAttribute (attr, fallback) {
      return _.has(this.inquiry, attr) ? this.inquiry[attr] : (fallback || '');
    }
  }
};
</script>
