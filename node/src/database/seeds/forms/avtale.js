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
      sizeClass: 'is-half'
    },
    {
      id: 1,
      label: 'Personnummer',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    }
  ],
  nextPage: null,
  prevPage: null
};

export default {
  name: 'timeavtale',
  pages: [page1]
};
