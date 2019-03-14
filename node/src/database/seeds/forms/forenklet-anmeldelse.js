const page1 = {
  id: 0,
  title: 'Anmelde tyveri eller skadeverk',
  subtitle: 'Fyll ut anmeldelse',
  info: 'Hvis du anmelder på vegne av noen andre, husk å benytt navnet til den fornærmede (den du anmelder for)',
  elements: [
    {
      id: 0,
      label: 'Fornærmede (ETTERNAVN, Fornavn. Evt. Firmanavn)',
      info: 'Navnet ditt eller navnet på den du melder for',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 1,
      label: 'Statsborgerskap',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 2,
      label: 'Personnummer/Org.nr',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 3,
      label: 'Kjønn',
      type: 'radio',
      value: '',
      choices: ['Mann', 'Kvinne', 'Annet'],
      info: 'Velg kjønn...',
      sizeClass: 'is-2'
    },
    {
      id: 4,
      label: 'Telefonnummer',
      type: 'text',
      value: '',
      sizeClass: 'is-4'
    },
    {
      id: 5,
      label: 'Adresse',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 6,
      label: 'Post nr.',
      type: 'text',
      value: '',
      sizeClass: 'is-2'
    },
    {
      id: 7,
      label: 'Post sted',
      type: 'text',
      value: '',
      sizeClass: 'is-4'
    }
  ],
  nextPage: 1,
  prevPage: null
};

const page2 = {
  id: 1,
  title: 'Anmelde tyveri eller skadeverk',
  subtitle: 'Fyll ut dine personlia. Dersom du ikke melder på vegne av noen andre kan du hoppe over denne siden.',
  elements: [
    {
      id: 1,
      label: 'Melder (ETTERNAVN, Fornavn)',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 2,
      label: 'Statsborgerskap',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 3,
      label: 'Personnummer/Org.nr',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 4,
      label: 'Kjønn',
      type: 'radio',
      value: '',
      choices: ['Mann', 'Kvinne'],
      sizeClass: 'is-2'
    },
    {
      id: 5,
      label: 'Telefonnummer',
      type: 'text',
      value: '',
      sizeClass: 'is-4'
    },
    {
      id: 6,
      label: 'Adresse',
      type: 'text',
      value: '',
      sizeClass: 'is-6'
    },
    {
      id: 7,
      label: 'Post nr.',
      type: 'text',
      value: '',
      sizeClass: 'is-2'
    },
    {
      id: 8,
      label: 'Post sted',
      type: 'text',
      value: '',
      sizeClass: 'is-4'
    }
  ],
  nextPage: 2,
  prevPage: 0
};

const page3 = {
  id: 2,
  title: 'Anmelde tyveri eller skadeverk',
  subtitle: '',
  elements: [
    {
      id: 0,
      label: 'Gjerningsbeskrivelse',
      info: 'Hva har skjedd? (Ved lommetyveri - hvor hadde du gjenstanden?)',
      type: 'textarea',
      value: '',
      sizeClass: 'is-12'
    }
  ],
  nextPage: null,
  prevPage: 1
};

export default {
  name: 'Forenklet anmeldelse',
  normalizedName: 'forenklet-anmeldelse',
  layout: 'normal',
  pages: [page1, page2, page3]
};
