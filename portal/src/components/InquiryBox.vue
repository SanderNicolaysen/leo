<template>
  <div class="card" v-bind:class="{ 'has-background-grey-lighter': active === inquiry.inquiry_id}">
    <div class="card-header">
      <p class="card-header-title">
        Kategori: {{ safeAttribute('type', 'ukjent') }}
      </p>
    </div>
    <div class="card-content">
      <div class="content">
        <table class="table is-fullwidth">
          <tr>
            <td>Personummer:</td>
            <td>{{ safeAttribute('NIN', fallback='ukjent') }}</td>
          </tr>
          <tr v-if="safeAttribute('forms')">
            <td>Skjema:</td>
            <td><a @click="showForms(inquiry.forms)">Klikk for å forhåndsvise</a></td>
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
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import StatusIndicator from '@/components/StatusIndicator.vue';
import FormModal from '@/components/FormModal.vue';

export default {
  props: ['inquiry', 'active'],
  components: {
    StatusIndicator
  },
  methods: {
    safeAttribute (attr, fallback) {
      return _.has(this.inquiry, attr) ? this.inquiry[attr] : (fallback || '');
    },
    showForms (forms) {
      this.$modal.open({
        parent: this,
        component: FormModal,
        props: { 'forms': forms }
      });
    }
  }
};
</script>
