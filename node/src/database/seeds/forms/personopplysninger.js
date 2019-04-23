const page0 = {
  id: 0,
  title: 'Dine personopplysninger|Your personal information',
  subtitle: 'Fyll ut dine personopplysninger|Fill in your personal information',
  info: '|',
  elements: [{
    choices: [],
    id: 0,
    type: "text",
    sizeClass: "is-12",
    label: "Fullt Navn|Full Name",
    info: "Nordmann, Ola|Smith, John"
  }, {
    choices: [],
    id: 1,
    type: "birth-num",
    sizeClass: "is-4",
    label: "Fødselsnummer|Identity number",
    info: "11 siffer|11 digits"
  }, {
    choices: [],
    id: 2,
    type: "country",
    sizeClass: "is-6",
    label: "Statsborgerskap|Citizenship",
    info: "|"
  }, {
    choices: ["Kvinne|Female", "Mann|Male"],
    id: 3,
    type: "radio",
    sizeClass: "is-2",
    label: "Kjønn|Sex",
    info: "|"
  }],
  nextPage: 1,
  prevPage: null
};

const page1 = {
  id: 1,
  title: "Din Kontakinformasjon|Your Contact Information",
  subtitle: "Fyll ut din kontaktinformasjon|Fill in your contact information",
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
    info: "kari.nordmann@leverandor.no|john.smith@supplier.com"
  }, {
    choices: [],
    id: 6,
    type: "text",
    sizeClass: "is-6",
    label: "Adresse|Address",
    info: "Gatenavn Gatenummer Leilighetsnummer|Street-name Street-number Apartment-number"
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
  name: 'Personopplysninger',
  normalizedName: 'personopplysninger',
  layout: 'normal',
  pages: [page0, page1]
};
