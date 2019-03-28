const page0 = {
  id: 0,
  title: "Hendelse",
  subtitle: "Fyll ut opplysninger om hendelsen",
  info: "",
  elements: [{
    choices: [],
    _id: "5c9cc2b98c18150ac812c6e2",
    id: 1,
    type: "text",
    sizeClass: "is-12",
    label: "Adresse",
    info: "Hvor skjedde forholdet? (nøyaktig adresse)"
  }, {
    choices: [],
    _id: "5c9cc2b98c18150ac812c6e1",
    id: 2,
    type: "text",
    sizeClass: "is-12",
    label: "Åsted",
    info: "f.eks. trapp, kjeller, bakgård, utested e.l."
  }, {
    choices: [],
    _id: "5c9cc2b98c18150ac812c6e0",
    id: 4,
    type: "text",
    sizeClass: "is-4",
    label: "Ukedag",
    info: "f.eks. \"Mandag\""
  }, {
    choices: [],
    _id: "5c9cc2b98c18150ac812c6df",
    id: 5,
    type: "text",
    sizeClass: "is-4",
    label: "Dato",
    info: "Dag, måned og år"
  }, {
    choices: [],
    _id: "5c9cc2b98c18150ac812c6de",
    id: 5,
    type: "text",
    sizeClass: "is-4",
    label: "Klokkeslett",
    info: "f.eks. \"14.17\" eller \"12.15 - 15.37\""
  }],
  prevPage: null,
  nextPage: 1
};

const page1 = {
  id: 1,
  title: "Hendelse",
  subtitle: "Gjerningsbeskrivelse",
  info: "Skriv så mange detaljer som mulig.<br><br><br>Ved lommetyveri - hvor hadde du gjenstanden?",
  elements: [{
    choices: [],
    _id: "5c9cc4758c18150ac812c6ee",
    id: 0,
    type: "textarea",
    sizeClass: "is-12",
    label: "Gjerningsbeskrivelse"
  }],
  prevPage: 0,
  nextPage: null
};

export default {
  name: 'Hendelse',
  normalizedName: 'hendelse',
  layout: 'split',
  pages: [page0, page1]
};