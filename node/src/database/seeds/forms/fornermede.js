const page0 = {
  id: 0,
  title: 'Fornermede',
  subtitle: 'Fyll ut fornermedes personopplysninger',
  info: 'FYLL INN OPPLYSNINGER FOR PERSONEN DU MELDER PÅ VEGNE AV',
  elements: [{
    choices: [],
    id: 0,
    type: "text",
    sizeClass: "is-12",
    label: "Fullt Navn",
    info: "Nordmann, Ola"
  }, {
    choices: [],
    id: 1,
    type: "birth-num",
    sizeClass: "is-4",
    label: "Fødselsnummer",
    info: "11 siffer"
  }, {
    choices: [],
    id: 2,
    type: "country",
    sizeClass: "is-6",
    label: "Statsborgerskap",
    info: ""
  }, {
    choices: ["Kvinne", "Mann"],
    id: 3,
    type: "radio",
    sizeClass: "is-2",
    label: "Kjønn"
  }],
  nextPage: 1,
  prevPage: null
};

const page1 = {
  id: 1,
  title: "Fornermede",
  subtitle: "Fyll ut fornermedes kontaktinformasjon",
  info: "",
  elements: [{
    choices: [],
    id: 4,
    type: "tel",
    sizeClass: "is-6",
    label: "Telefonnummer"
  }, {
    choices: [],
    id: 5,
    type: "email",
    sizeClass: "is-6",
    label: "E-post",
    info: "kari.nordmann@leverandor.no"
  }, {
    choices: [],
    id: 6,
    type: "text",
    sizeClass: "is-6",
    label: "Adresse",
    info: "Gatenavn Gatenummer Leilighetsnummer"
  }, {
    choices: [],
    id: 7,
    type: "postal",
    value: "",
    sizeClass: "is-6",
    label: "Postnr."
  }],
  prevPage: 0,
  nextPage: null
};


export default {
  name: 'Fornermede',
  normalizedName: 'fornermede',
  layout: 'normal',
  pages: [page0, page1]
};