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
      label: "Fabrikkmerke|Trademark",
      info: "f.eks. \"Nakamura\", \"DBS\" eller \"Scott\"|f.ex. \"Nakamura\", \"DBS\" or \"Scott\""
    }, {
      choices: [],
      id: 1,
      type: "text",
      sizeClass: "is-4",
      label: "Modell|Model",
      info: "f.eks. \"Pulse\", \"Edda\" eller \"Spark\"|f.ex. \"Pulse\", \"Edda\" or \"Spark\""
    }, {
      choices: [],
      id: 2,
      type: "model-year",
      sizeClass: "is-4",
      label: "Årsmodell|Model year",
      info: "f.eks. \"2012\"|f.ex. \"2012\""
    }, {
      choices: [],
      id: 3,
      type: "text",
      sizeClass: "is-6",
      label: "Farge|Colour",
      info: "f.eks. \"Sølvgrå\", \"Rød\" eller \"Turkis\"|f.ex. \"Silvergrey\", \"Red\" or \"Turquoise\""
    }, {
      choices: ["Låst|Locked", "Ulåst|Unlocked"],
      id: 4,
      type: "radio",
      sizeClass: "is-6",
      label: "Låst?|Locked?",
      info: "|"
    }, {
      choices: [],
      id: 6,
      type: "text",
      sizeClass: "is-12",
      label: "Rammenummer|Vehicle Identification Number",
      info: "f.eks. \"WC12345Z\" eller \"WTU123G1234Z\"|f.ex. \"WC12345Z\" or \"WTU123G1234Z\""
    }],
    id: 0,
    title: "Sykkel|Bicycle",
    subtitle: "Sykkelopplysninger|Bicycle information",
    info: "|",
    prevPage: null,
    nextPage: null
  }]
};

