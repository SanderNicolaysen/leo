const page1 = {
  id: 0,
  title: 'Hente eller levere hittegods',
  subtitle: 'Fyll ut skjema',
  elements: [
    {
      id: 0,
      label: 'Gjenstand',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    },
    {
      id: 1,
      label: 'Farge',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    },
    {
      id: 2,
      label: 'Modell',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    },
    {
      id: 2,
      label: 'Dato funnet',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    },
    {
      id: 3,
      label: 'Lokasjonen du mast/fant gjenstanden',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    }
  ],
  nextPage: 1,
  prevPage: null
};

const page2 = {
  id: 1,
  title: 'Hente eller levere hittegods',
  subtitle: 'Fyll ut anmeldelse',
  elements: [
    {
      id: 0,
      label: 'Fult navn',
      type: 'text',
      value: '',
      sizeClass: 'is-full'
    },
    {
      id: 2,
      label: 'Statsborgerskap',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    },
    {
      id: 3,
      label: 'Personnummer/Org.nr',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    },
    {
      id: 4,
      label: 'Kjønn',
      type: 'radio',
      value: '',
      choices: ['Mann', 'Kvinne'],
      sizeClass: 'is-one-fifth'
    },
    {
      id: 5,
      label: 'Telefonnummer',
      type: 'text',
      value: '',
      sizeClass: 'is-quarter'
    },
    {
      id: 6,
      label: 'Adresse',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    },
    {
      id: 7,
      label: 'Post nr.',
      type: 'text',
      value: '',
      sizeClass: 'is-one-fifth'
    },
    {
      id: 8,
      label: 'Post sted',
      type: 'text',
      value: '',
      sizeClass: 'is-quarter'
    }
  ],
  nextPage: 2,
  prevPage: 0
};

const page3 = {
  id: 2,
  title: 'Hente eller levere hittegods',
  subtitle: 'Fyll ut anmeldelse',
  elements: [
    {
      id: 0,
      label: 'Beskrivelse av hittegods',
      info: 'Om du ønsker kan du beskrive gjenstanden mer nøyaktig slik at det bli enklere å finne ',
      type: 'textarea',
      value: '',
      sizeClass: 'is-full'
    }
  ],
  nextPage: null,
  prevPage: 1
};

export default {
  name: 'hittegods',
  pages: [page1, page2, page3]
};
