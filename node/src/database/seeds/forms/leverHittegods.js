const page1 = {
  id: 0,
  title: 'Hittegods og beslag',
  subtitle: 'Levering av hittegods',
  info: 'Vennligst skriv inn navnet på gjenstanden. Det hadde vært flott. veldig bra',
  elements: [
    {
      id: 0,
      label: 'Hvilken gjenstand skal du levere?',
      type: 'text',
      value: '',
      sizeClass: 'is-full'
    }
  ],
  nextPage: 1,
  prevPage: null
};

const page2 = {
  id: 1,
  title: 'Hittegods og beslag',
  subtitle: 'Levering av hittegods',
  info: '',
  elements: [
    {
      id: 0,
      label: 'Hvilken farge er gjenstanden?',
      type: 'text',
      value: '',
      sizeClass: 'is-full'
    }
  ],
  nextPage: 2,
  prevPage: 0
};

const page3 = {
  id: 2,
  title: 'Hittegods og beslag',
  subtitle: 'Levering av hittegods',
  info: '',
  elements: [
    {
      id: 0,
      label: 'Hvilken modell er det?',
      type: 'text',
      value: '',
      sizeClass: 'is-full'
    }
  ],
  nextPage: 3,
  prevPage: 1
};

const page4 = {
  id: 3,
  title: 'Hittegods og beslag',
  subtitle: 'Levering av hittegods',
  info: '',
  elements: [
    {
      id: 0,
      label: 'Fornavn',
      type: 'text',
      value: '',
      sizeClass: 'is-full'
    },
    {
      id: 1,
      label: 'Etternavn',
      type: 'text',
      value: '',
      sizeClass: 'is-full'
    },
    {
      id: 2,
      label: 'Telefonnummer',
      type: 'tel',
      value: '',
      sizeClass: 'is-full'
    }
  ],
  nextPage: null,
  prevPage: 2
};

export default {
  name: 'leverHittegods',
  pages: [page1, page2, page3, page4]
};
