<template>
  <div class="column" :class="[ element.sizeClass ]">
    <!-- Label -->
    <label class="label" v-if="element.type !== 'checkbox'">{{ element.label }}</label>

    <!-- Input type: text -->
    <b-field v-if="element.type === 'text'">
      <b-input maxlength="50" :has-counter="false" type="text" v-model="element.value" />
    </b-field>

    <!-- Input type: textarea -->
    <div class="control" v-else-if="element.type === 'textarea'">
      <textarea class="textarea" placeholder="" v-model="element.value"></textarea>
    </div>

    <!-- Input type: radio -->
    <div class="control" v-else-if="element.type === 'radio'">
      <label class="radio" v-for="choice in element.choices" :key="choice">
        <input type="radio" :value="choice" v-model="element.value">
        {{ choice }}
      </label>
    </div>

    <!-- Input type: select -->
    <div class="control" v-else-if="element.type === 'select'">
      <div class="select">
        <select v-model="element.value">
          <option v-for="choice in element.choices" :key="choice">{{ choice }}</option>
        </select>
      </div>
    </div>

    <!-- Input type: checkbox -->
    <div class="control" v-else-if="element.type === 'checkbox'">
      <label class="checkbox">
        <input type="checkbox" v-model="element.value">
        {{ element.label }}
      </label>
    </div>

    <!-- Input type: tel -->
    <b-field v-else-if="element.type === 'tel'"
      :type="{ 'is-danger': errors.has('tel') }"
      :message="{ [$t('telError')]: errors.has('tel') }">
      <b-input maxlength="15" :has-counter="false" name="tel" v-validate="'min:5'" icon="phone" type="tel" v-model="element.value" />
    </b-field>

    <!-- Input type: Postnr/Poststed -->
    <div class="control" v-else-if="element.type === 'postal'">
      <input-postal v-model="element.value" />
    </div>

    <!-- Input type: country -->
    <b-field v-else-if="element.type === 'country'">
      <input-country v-model="element.value" />
    </b-field>

    <!-- Input type: email -->
    <b-field v-else-if="element.type === 'email'"
      :type="{'is-danger': errors.has('email')}"
      :message="errors.first('email')">
      <b-input maxlength="254" :has-counter="false" type="email" icon="email" data-vv-as="E-post" v-model="element.value" name="email" v-validate="'email'" />
    </b-field>

    <!-- Input type: birth-num -->
    <b-field v-else-if="element.type === 'birth-num'">
      <input-birth-num v-model="element.value" />
    </b-field>

    <!-- Input type: imei -->
    <b-field v-else-if="element.type === 'imei'"
      :type="{ 'is-danger': errors.has('IMEI') }"
      :message="{ [$t('imeiError')]: errors.has('IMEI') }">
      <b-input
        type="number"
        v-model="element.value"
        name="IMEI"
        v-validate="'length:15'"
        >
      </b-input>
    </b-field>

    <!-- Input type: model-year -->
    <b-field v-else-if="element.type === 'model-year'"
      :type="{ 'is-danger': errors.has('model-year') }"
      :message="{ [$t('modelYearError')]: errors.has('model-year') }">
      <b-input
        type="number"
        v-model="element.value"
        name="model-year"
        v-validate="'min_value:1900|max_value:' + new Date().getFullYear()"
        >
      </b-input>
    </b-field>

    <!-- Input type: license-plate -->
    <b-field v-else-if="element.type === 'license-plate'"
      :type="{ 'is-danger': errors.has('license-plate') }"
      :message="{ [$t('licensePlateError')]: errors.has('license-plate') }">
      <b-input
        type="text"
        v-model="element.value"
        name="license-plate"
        maxlength="7"
        :has-counter="false"
        v-validate="'length:7'"
        >
      </b-input>
    </b-field>

    <!-- Input type: vin -->
    <b-field v-else-if="element.type === 'vin'"
      :type="{ 'is-danger': errors.has('vin') }"
      :message="{ [$t('vinError')]: errors.has('vin') }">
      <b-input
        type="text"
        v-model="element.value"
        name="vin"
        maxlength="17"
        :has-counter="false"
        v-validate="'length:17'"
        >
      </b-input>
    </b-field>

    <!-- Input type: org-num -->
    <b-field v-else-if="element.type === 'org-num'"
      :type="{ 'is-danger': errors.has('org-num') }"
      :message="{ [$t('orgNumError')]: errors.has('org-num') }">
      <b-input
        type="number"
        v-model="element.value"
        name="org-num"
        v-validate="'length:9'"
        >
      </b-input>
    </b-field>

    <p class="help is-primary" v-if="exists(element.info)">{{ element.info }}</p>
  </div>
</template>

<script>
import _ from 'lodash';
import InputPostal from '@/components/InputPostal.vue';
import InputCountry from '@/components/InputCountry.vue';
import InputBirthNum from '@/components/InputBirthNum.vue';

export default {
  name: 'FlexiInput',
  props: ['element'],
  components: {
    InputPostal,
    InputCountry,
    InputBirthNum
  },
  methods: {
    exists: function (prop) {
      return !_.isUndefined(prop) && prop !== '';
    }
  }
};
</script>
