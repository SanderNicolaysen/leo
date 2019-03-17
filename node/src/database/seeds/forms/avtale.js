const page1 = {
  id: 0,
  title: 'Avtale',
  subtitle: 'Fyll ut dine detaljer',
  info: 'Vi bruker dette til å møte deg så snart som mulig.\nIngen felt er obligatoriske, men fyll så mange du kan.',
  elements: [
    {
      id: 0,
      label: 'Navn',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 1,
      label: 'Fødselsdato (DDMMÅÅ)',
      type: 'text',
      value: '',
      sizeClass: 'is-half'
    },
    {
      id: 2,
      label: 'Saksnummer',
      type: 'text',
      value: '',
      sizeClass: 'is-full'
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
