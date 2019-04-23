export default {
  name: "Bil",
  normalizedName: "bil",
  layout: "normal",
  pages: [{
    elements: [{
      choices: [],
      id: 0,
      type: "text",
      sizeClass: "is-4",
      label: "Fabrikkmerke|Trademark",
      info: "f.eks. \"Ford\", \"Toyota\" eller \"Volvo\"|f.ex. \"Ford\", \"Toyota\" or \"Volvo\""
    }, {
      choices: [],
      id: 1,
      type: "text",
      sizeClass: "is-4",
      label: "Modell|Model",
      info: "f.eks. \"Focus\", \"Auris\" eller \"240\"|f.ex. \"Focus\", \"Auris\" or \"240\""
    }, {
      choices: [],
      id: 2,
      type: "model-year",
      sizeClass: "is-4",
      label: "Årsmodell|Model year",
      info: "f.eks. \"2009\"|f.ex. \"2009\""
    }, {
      choices: [],
      id: 3,
      type: "text",
      sizeClass: "is-4",
      label: "Farge|Colour",
      info: "f.eks. \"Sølvgrå\", \"Rød\" eller \"Turkis\"|f.ex. \"Silvergrey\", \"Red\" or \"Turquoise\""
    }, {
      choices: ["Låst|Locked", "Ulåst|Unlocked"],
      id: 4,
      type: "radio",
      sizeClass: "is-4",
      label: "Låst?|Locked?",
      info: "|"
    }, {
      choices: [],
      id: 5,
      type: "license-plate",
      sizeClass: "is-4",
      label: "Kjennemerke (Skiltnummer)|Number plate",
      info: "f.eks. AB12345|f.ex. AB12345"
    }, {
      choices: [],
      id: 6,
      type: "vin",
      sizeClass: "is-12",
      label: "Rammenummer|Vehicle Identification Number",
      info: "f.eks. \"WVWZZZ3BZWE689725\" eller \"1GKCS13W8P2579514\"|f.ex. \"WVWZZZ3BZWE689725\" or \"1GKCS13W8P2579514\""
    }],
    id: 0,
    title: "Bil|Car",
    subtitle: "Kjøretøyopplysninger|Vehicle information",
    info: "|",
    prevPage: null,
    nextPage: null
  }]
};

