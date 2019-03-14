const page1 = {
  id: 0,
  title: 'Avtale',
  subtitle: 'Fyll ut dine detaljer',
  info: 'Vi bruker dette til å møte deg så snart som mulig',
  elements: [
    {
      id: 0,
      label: 'Etternavn',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 1,
      label: 'Personnummer',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    }
  ],
  nextPage: null,
  prevPage: null
};

export default {
  name: 'Timeavtale',
  normalizedName: 'timeavtale',
  layout: 'normal',
  pages: [page1]
};
