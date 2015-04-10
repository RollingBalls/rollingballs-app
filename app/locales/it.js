var it = {
  locales: ['it'],

  formats: {
    number: {
      price: {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0
      }
    },

    date: {
      long: {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    },

    time: {
      withDate: {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      },

      short: {
        hour: "2-digit",
        minute: "2-digit",
        pattern: "{hour}:{minute}",
        pattern12: "{hour}:{minute} {ampm}"
      }
    }
  },

  messages: {
    appName: "RollingBalls"
  }
};

export default it;
