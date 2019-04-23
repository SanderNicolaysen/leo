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

      if (this.type === 'radio' || this.type === 'select') {
        element.choices = ['Valg 1|Choice 1', 'Valg 2|Choice 2'];
      }

      element.info = '|';

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
