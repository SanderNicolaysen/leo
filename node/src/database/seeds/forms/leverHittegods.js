const page1 = {
  id: 0,
  title: 'Hittegods og beslag',
  subtitle: 'Levering av hittegods',
  info: 'Vennligst få med nok detaljer slik at det blir enklere for personen som har mistet gjenstanden. <br>Husk å få med eventuelt merke og modellnavn ',
  elements: [
    {
      id: 0,
      label: 'Hva skal du levere?',
      info: 'Skriv en kort beskrivelse av gjenstanden du leverer',
      type: 'text',
      value: '',
      sizeClass: 'is-12'
    }
  ],
  nextPage: 1,
  prevPage: null
};

const page2 = {
  id: 1,
  title: 'Hittegods og beslag',
  subtitle: 'Henting av hittegods, og henting av beslag',
  info: 'Fyll ut din kontaktinformasjon.',
  elements: [
    {
      id: 0,
      label: 'Fornavn',
      type: 'text',
      value: '',
      sizeClass: 'is-12'
    },
    {
      id: 1,
      label: 'Etternavn',
      type: 'text',
      value: '',
      sizeClass: 'is-12'
    },
    {
      id: 2,
      label: 'Telefonnummer',
      type: 'tel',
      value: '',
      sizeClass: 'is-12'
    },
    {
      id: 3,
      label: 'Personnummer',
      type: 'text',
      value: '',
      sizeClass: 'is-12'
    }
  ],
  nextPage: null,
  prevPage: 0
};

export default {
  name: 'Lever hittegods',
  normalizedName: 'lever-hittegods',
  layout: 'split',
  pages: [page1, page2]
};
