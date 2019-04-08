export default {
  name: "Sykkel",
  normalizedName: "sykkel",
  layout: "normal",
  pages: [{
    elements: [{
      choices: [],
      id: 0,
      type: "text",
      sizeClass: "is-4",
      label: "Fabrikkmerke",
      info: "f.eks. \"Nakamura\", \"DBS\" eller \"Scott\""
    }, {
      choices: [],
      id: 1,
      type: "text",
      sizeClass: "is-4",
      label: "Modell",
      info: "f.eks. \"Pulse\", \"Edda\" eller \"Spark\""
    }, {
      choices: [],
      id: 2,
      type: "model-year",
      sizeClass: "is-4",
      label: "Årsmodell",
      info: "f.eks \"2012\""
    }, {
      choices: [],
      id: 3,
      type: "text",
      sizeClass: "is-6",
      label: "Farge",
      info: "f.eks. \"Sølvgrå\", \"Rød\" eller \"Turkis\""
    }, {
      choices: ["Låst", "Ulåst"],
      id: 4,
      type: "radio",
      sizeClass: "is-6",
      label: "Låst?"
    }, {
      choices: [],
      id: 6,
      type: "text",
      sizeClass: "is-12",
      label: "Rammenummer",
      info: "f.eks. \"WC12345Z\" eller \"WTU123G1234Z\""
    }],
    id: 0,
    title: "Sykkel",
    subtitle: "Sykkelopplysninger",
    info: "",
    prevPage: null,
    nextPage: null
  }]
};

