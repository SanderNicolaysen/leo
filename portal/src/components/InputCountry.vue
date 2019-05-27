<template>
  <b-select @input="$emit('input', country)" v-model="country" icon="earth">
        <option
            v-for="country in countries"
            :key="country"
            >
            {{ country }}
        </option>
    </b-select>
</template>

<script>
import axios from 'axios';

export default {
  props: ['value'],
  data: function () {
    return {
      countries: [],
      country: this.value
    };
  },
  mounted: async function () {
    this.getCountries();
  },
  methods: {
    getCountries: async function () {
      var countries;

      if (this.$i18n.locale === 'no') { // If lang is no, get norwegian country-names
        countries = await axios.get('/countries-no.txt');
      } else if (this.$i18n.locale === 'en') { // If lang is en, get english country-names
        countries = await axios.get('/countries-en.txt');
      }

      this.countries = countries.data.split('\n');

      if (this.country === '') { // If no country is chosen, the default country chosen is Norge/Norway
        this.setCountryToNorway();
      } else if (this.countries.indexOf(this.country) < 0) { // If you change lang while having selected a country, and the old country-name is not in the new country-list - set the choice to Norge/Norway
        this.setCountryToNorway();
      }
    },
    setCountryToNorway: function () {
      this.country = this.countries[129];
      this.$emit('input', this.country);
    }
  },
  watch: {
    // If the user changes lang, update the country-names with the chosen language
    '$i18n.locale': function () {
      this.getCountries();
    }
  }
};
</script>
