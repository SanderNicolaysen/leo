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
      label: "Fabrikkmerke|Trademark",
      info: "f.eks. \"Apple\", \"Samsung\" eller \"Nokia\"|f.ex. \"Apple\", \"Samsung\" or \"Nokia\""
    }, {
      choices: [],
      id: 1,
      type: "text",
      sizeClass: "is-4",
      label: "Modell|Model",
      info: "f.eks. \"iPhone XR\", \"Galaxy S8\" eller \"3310\"|f.ex. \"iPhone XR\", \"Galaxy S8\" or \"3310\""
    }, {
      choices: [],
      id: 2,
      type: "text",
      sizeClass: "is-4",
      label: "Farge|Colour",
      info: "f.eks. \"Svart\", \"Rød\" eller \"Turkis\"|f.ex. \"Black\", \"Red\" or \"Turquoise\""
    },
    {
      choices: [],
      id: 3,
      type: "imei",
      sizeClass: "is-6",
      label: "IMEI (International Mobile Equipment Identity)|IMEI (International Mobile Equipment Identity)",
      info: "|"
    },
    {
      choices: [],
      id: 4,
      type: "text",
      sizeClass: "is-6",
      label: "Serienummer|Serial number",
      info: "|"
    }],
    id: 0,
    title: "Telefon|Telephone",
    subtitle: "Telefonopplysninger|Telephone information",
    info: "|",
    prevPage: null,
    nextPage: null
  }]
};

