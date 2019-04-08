export default {
  name: "Telefon",
  normalizedName: "telefon",
  layout: "normal",
  pages: [{
    elements: [{
      choices: [],
      id: 0,
      type: "text",
      sizeClass: "is-4",
      label: "Fabrikkmerke",
      info: "f.eks. \"Apple\", \"Samsung\" eller \"Nokia\""
    }, {
      choices: [],
      id: 1,
      type: "text",
      sizeClass: "is-4",
      label: "Modell",
      info: "f.eks. \"iPhone XR\", \"Galaxy S8\" eller \"3310\""
    }, {
      choices: [],
      id: 2,
      type: "text",
      sizeClass: "is-4",
      label: "Farge",
      info: "f.eks. \"Svart\", \"Rød\" eller \"Turkis\""
    },
    {
      choices: [],
      id: 3,
      type: "imei",
      sizeClass: "is-6",
      label: "IMEI (International Mobile Equipment Identity)",
      info: ""
    },
    {
      choices: [],
      id: 4,
      type: "text",
      sizeClass: "is-6",
      label: "Serienummer",
      info: ""
    }],
    id: 0,
    title: "Telefon",
    subtitle: "Telefonopplysninger",
    info: "",
    prevPage: null,
    nextPage: null
  }]
};

