const page0 = {
  id: 0,
  title: 'Dine personopplysninger',
  subtitle: 'Fyll ut dine personopplysninger',
  info: '',
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
    info: "",
    value: ""
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
  title: "Din Kontakinformasjon",
  subtitle: "Fyll ut din kontaktinformasjon",
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
  name: 'Personopplysninger',
  normalizedName: 'personopplysninger',
  layout: 'normal',
  pages: [page0, page1]
};
