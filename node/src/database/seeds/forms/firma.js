const page0 = {
  id: 0,
  title: 'Firma',
  subtitle: 'Fyll ut firmaets opplysninger',
  info: '',
  elements: [{
    choices: [],
    id: 0,
    type: "text",
    sizeClass: "is-12",
    label: "Firmanavn",
    info: ""
  }, {
    choices: [],
    id: 1,
    type: "text",
    sizeClass: "is-12",
    label: "Organisasjonsnummer",
    info: ""
  }],
  nextPage: 1,
  prevPage: null
};

const page1 = {
  id: 1,
  title: "Firma",
  subtitle: "Fyll ut firmaets kontaktinformasjon",
  info: "",
  elements: [{
    choices: [],
    id: 4,
    type: "text",
    sizeClass: "is-6",
    label: "Telefonnummer"
  }, {
    choices: [],
    id: 5,
    type: "text",
    sizeClass: "is-6",
    label: "E-post",
    info: "kari@bedrift.no"
  }, {
    choices: [],
    id: 6,
    type: "text",
    sizeClass: "is-6",
    label: "Adresse",
    info: "Gatenavn Gatenummer"
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
  name: 'Firma',
  normalizedName: 'firma',
  layout: 'normal',
  pages: [page0, page1]
};