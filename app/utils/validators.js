var normalizeString = function(value) {
  value = value || '';
  return value.toString().trim();
};

export default {
  email() {
    return function(value) {
      var re = /^\S+@\S+\.\S+$/;
      if (!re.test(normalizeString(value))) {
        return { code: "INVALID_EMAIL" };
      }
    };
  },

  required() {
    return function(val) {
      if (normalizeString(val).length === 0) {
        return { code: "REQUIRED_FIELD" };
      }
    };
  },

  minLength(minLength) {
    return function(value) {
      value = value || '';
      if (normalizeString(value).length < minLength) {
        return {
          code: "MIN_LENGTH",
          placeholders: { min_length: minLength }
        };
      }
    };
  },

  accept() {
    return function(value) {
      if (value !== true) {
        return { code: "ACCEPTANCE_REQUIRED" };
      }
    };
  },

  requiredIf(field) {
    return function(value, data) {
      if (
        data[field] &&
        normalizeString(value).length === 0
      ) {
        return { code: "REQUIRED_FIELD" };
      }
    };
  }
};
