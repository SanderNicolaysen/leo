import _ from 'lodash';

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
    addElement () {
      const element = { id: this.page.elements.length, type: this.type, value: '', sizeClass: this.sizeRemainder };

      if (this.type === 'text') element.label = 'Tekst';
      else if (this.type === 'textarea') element.label = 'Tekstområde';
      else if (this.type === 'radio') element.label = 'Radioknapper';
      else if (this.type === 'select') element.label = 'Nedtrekksmeny';
      else if (this.type === 'postal') element.label = 'Postnr.';

      if (this.type === 'radio' || this.type === 'select') {
        element.choices = ['Valg 1', 'Valg 2'];
      }

      this.page.elements.push(element);
    },
    remove (index) {
      this.page.elements.splice(index, 1);
    },
    save (element) {
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
