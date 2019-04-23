const page0 = {
  id: 0,
  title: 'Firma|Company',
  subtitle: 'Fyll ut firmaets opplysninger|Fill in the company information',
  info: '',
  elements: [{
    choices: [],
    id: 0,
    type: "text",
    sizeClass: "is-12",
    label: "Firmanavn|Company name",
    info: "|"
  }, {
    choices: [],
    id: 1,
    type: "org-num",
    sizeClass: "is-12",
    label: "Organisasjonsnummer|Organization number",
    info: "|"
  }],
  nextPage: 1,
  prevPage: null
};

const page1 = {
  id: 1,
  title: "Firma|Company",
  subtitle: "Fyll ut firmaets kontaktinformasjon|Fill in the company contact information",
  info: "|",
  elements: [{
    choices: [],
    id: 4,
    type: "tel",
    sizeClass: "is-6",
    label: "Telefonnummer|Phone number",
    info: "|"
  }, {
    choices: [],
    id: 5,
    type: "email",
    sizeClass: "is-6",
    label: "E-post|Email",
    info: "kari@bedrift.no|john@company.com"
  }, {
    choices: [],
    id: 6,
    type: "text",
    sizeClass: "is-6",
    label: "Adresse|Address",
    info: "Gatenavn Gatenummer|Street-name Street-number"
  }, {
    choices: [],
    id: 7,
    type: "postal",
    value: "",
    sizeClass: "is-6",
    label: "Postnr.|Postal code",
    info: "|"
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