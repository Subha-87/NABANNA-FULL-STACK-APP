export const HARDWARE_OPTIONS = {
  ALL_IN_ONE: {
    makes: ["HP", "Dell", "Lenovo", "Acer", "Other"],
    models: [],
    warranty: 3,
  },
  LAPTOP: {
    makes: ["HP", "Dell", "Lenovo", "Other"],
    models: [],
    warranty: 3,
  },

  CPU: {
    makes: ["HP", "Dell", "Lenovo", "Other"],
    models: [],
    warranty: 3,
  },

  MONITOR: {
    makes: ["HP", "Dell", "LG", "Samsung", "Other"],
    models: [],
    warranty: 3,
  },

  UPS: {
    makes: ["APC", "Microtek", "Uniline", "Frontech", "Other"],
    models: [],
    capacity: ["600VA", "1KVA", "2KVA", "Other"],
    warranty: 1,
  },

  PRINTER: {
    makes: ["HP", "Canon", "Brother", "Other"],
    models: [
      {
        name: "LaserJet Black & White",
        warranty: 1,
      },
      {
        name: "LaserJet MFP Black & White",
        warranty: 3,
      },
      {
        name: "LaserJet Color",
        warranty: 1,
      },
      {
        name: "LaserJet Color MFP",
        warranty: 3,
      },
      {
        name: "Other",
        warranty: 1,
      },
    ],
  },
  SCANNER: {
    makes: ["HP", "Canon", "Epson", "Other"],
    models: [
      {
        name: "Flatbed Scanner",
        warranty: 1,
      },
      {
        name: "ADF Flatbed Scanner",
        warranty: 1,
      },
      {
        name: "Network Scanner",
        warranty: 3,
      },
    ],
  },
};
