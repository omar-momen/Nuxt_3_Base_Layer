const ar_letters_regex = /^[\u0600-\u06FF\s]+$/;
const en_letters_regex = /^[a-zA-Z\s]*$/;
const url_regex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const saudi_phone_numbers = /^05\d{8}$/;
const base_password_regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

export const useInputRules = () => {
  return {
    only_ar_letters: (val) => {
      if (val && ar_letters_regex.test(val)) {
        return true;
      }
      return false;
    },
    only_en_letters: (val) => {
      if (val && en_letters_regex.test(val)) {
        return true;
      }
      return false;
    },
    url: (val) => {
      if (val && url_regex.test(val)) {
        return true;
      }
      return false;
    },
    passowrd: (val) => {
      if (val && base_password_regex.test(val)) {
        return true;
      }
      return false;
    },
    saudi_phone_numbers: (val) => {
      if (val && saudi_phone_numbers.test(val)) {
        return true;
      }
      return false;
    },
  };
};
