var en = {
  locales: ['en'],

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
        minute: "2-digit",
        second: "2-digit",
        pattern: "{minute}:{seconds}"
      }
    }
  },

  messages: {
    puzzles: {
      found: "{count, plural, =0 {0 puzzles} =1 {1 puzzle} other {# puzzles}} found!"
    }
  }
};

export default en;
