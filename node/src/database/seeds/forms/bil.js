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
      label: "Fabrikkmerke",
      info: "f.eks. \"Ford\", \"Toyota\" eller \"Volvo\""
    }, {
      choices: [],
      id: 1,
      type: "text",
      sizeClass: "is-4",
      label: "Modell",
      info: "f.eks. \"Focus\", \"Auris\" eller \"240\""
    }, {
      choices: [],
      id: 2,
      type: "text",
      sizeClass: "is-4",
      label: "Årsmodell",
      info: "f.eks \"2009\""
    }, {
      choices: [],
      id: 3,
      type: "text",
      sizeClass: "is-4",
      label: "Farge",
      info: "f.eks. \"Sølvgrå\", \"Rød\" eller \"Turkis\""
    }, {
      choices: ["Låst", "Ulåst"],
      id: 4,
      type: "radio",
      sizeClass: "is-4",
      label: "Låst?"
    }, {
      choices: [],
      id: 5,
      type: "text",
      sizeClass: "is-4",
      label: "Kjennemerke (Skiltnummer)",
      info: "f.eks. AB12345"
    }, {
      choices: [],
      id: 6,
      type: "text",
      sizeClass: "is-12",
      label: "Rammenummer",
      info: "f.eks. \"WVWZZZ3BZWE689725\" eller \"1GKCS13W8P2579514\""
    }],
    id: 0,
    title: "Bil",
    subtitle: "Kjøretøyopplysninger",
    info: "",
    prevPage: null,
    nextPage: null
  }]
};

