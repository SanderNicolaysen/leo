import _ from 'lodash';
import getSubstring from '@/lang/utils.js';

export default {
  props: ['page', 'layout'],
  data: function () {
    return {
      editByIndex: null,
      type: 'text',
      sizes: [2, 4, 6, 8, 10, 12]
    };
  },
  methods: {
    getSubstring: function (string) {
      if (string != null) { return getSubstring(string, this); }
    },
    addEn: function (i18n, element, initialElement) { // Add english parts to element
      i18n.locale = 'en';
      element.info =
          element.info + '|' + this.getSubstring(initialElement.info);
      element.label =
          element.label + '|' + this.getSubstring(initialElement.label);
      element.choices.forEach(function (choice, i) {
        element.choices[i] =
            choice + '|' + this.getSubstring(initialElement.choices[i]);
      }, this);
      i18n.locale = 'no';
    },
    addNo: function (i18n, element, initialElement) { // Add norwegian parts to element
      i18n.locale = 'no';
      element.info =
          this.getSubstring(initialElement.info) + '|' + element.info;
      element.label =
          this.getSubstring(initialElement.label) + '|' + element.label;
      element.choices.forEach(function (choice, i) {
        element.choices[i] =
            this.getSubstring(initialElement.choices[i]) + '|' + choice;
      }, this);
      i18n.locale = 'en';
    },
    addElement () {
      const element = { id: this.page.elements.length, type: this.type, sizeClass: this.sizeRemainder };

      if (this.type === 'text') element.label = 'Tekst|Text';
      else if (this.type === 'textarea') element.label = 'Tekstområde|Text area';
      else if (this.type === 'radio') element.label = 'Radioknapper|Radio buttons';
      else if (this.type === 'select') element.label = 'Nedtrekksmeny|Dropdown menu';
      else if (this.type === 'postal') element.label = 'Postnr.|Postal code';
      else if (this.type === 'tel') element.label = 'Telefonnummer|Phone number';
      else if (this.type === 'country') element.label = 'Statsborgerskap|Citizenship';
      else if (this.type === 'email') {
        element.label = 'E-post|Email';
        element.info = 'kari@bedrift.no|john@company.com';
      } else if (this.type === 'birth-num') {
        element.label = 'Fødselsnummer|Identity number';
        element.info = '11 siffer|11 digits';
      } else if (this.type === 'imei') element.label = 'IMEI (International Mobile Equipment Identity)|IMEI (International Mobile Equipment Identity)';
      else if (this.type === 'model-year') {
        element.label = 'Årsmodell|Model year';
        element.info = 'f.eks. "2009"|f.ex. "2009"';
      } else if (this.type === 'license-plate') {
        element.label = 'Kjennemerke (Skiltnummer)|Number plate';
        element.info = 'f.eks. AB12345|f.ex. AB12345';
      } else if (this.type === 'vin') {
        element.label = 'Rammenummer|Vehicle Identification Number';
        element.info = 'f.eks. "WVWZZZ3BZWE689725" eller "1GKCS13W8P2579514"|f.ex. "WVWZZZ3BZWE689725" or "1GKCS13W8P2579514"';
      } else if (this.type === 'org-num') element.label = 'Organisasjonsnummer|Organization number';

      if (this.type === 'radio' || this.type === 'select') {
        element.choices = ['Valg 1|Choice 1', 'Valg 2|Choice 2'];
      }

      if (element.info == null) { element.info = '|'; }

      this.page.elements.push(element);
    },
    remove (index) {
      this.page.elements.splice(index, 1);
    },
    save (element) {
      var i18n = this.$i18n;
      const initialElement = this.page.elements[this.editByIndex];

      if (i18n.locale === 'no') { this.addEn(i18n, element, initialElement); } else { this.addNo(i18n, element, initialElement); }

      this.page.elements.splice(this.editByIndex, 1, element);
    },
    growElement (index) {
      const size = Number.parseInt(this.page.elements[index].sizeClass.replace('is-', ''));
      if (size === _.last(this.sizes)) return;
      const newSize = _.nth(this.sizes, _.sortedIndex(this.sizes, size) + 1);
      this.page.elements[index].sizeClass = 'is-' + newSize.toString();
    },
    shrinkElement (index) {
      const size = Number.parseInt(this.page.elements[index].sizeClass.replace('is-', ''));
      if (size === _.head(this.sizes)) return;
      const newSize = _.nth(this.sizes, _.sortedIndex(this.sizes, size) - 1);
      this.page.elements[index].sizeClass = 'is-' + newSize.toString();
    }
  },
  computed: {
    sizeRemainder: function () {
      const sizeMap = _.map(this.page.elements, e => { return Number.parseInt(e.sizeClass.replace('is-', '')); });

      const columnSum = _.reduce(sizeMap, (sum, n) => {
        if (sum + n > 12) return n;
        return sum + n;
      }, 0);

      let rem = 12 - columnSum;
      if (rem === 0 || !rem) rem = 12;
      return 'is-' + rem.toString();
    }
  }
};
