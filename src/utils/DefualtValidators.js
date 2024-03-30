import validator from "validator";

const defualtValidators = {
  nameValidator: {
    id: "nameValidator",
    massege: { ar: "يرجى ادخال اسم صحيح", en: "Please enter a correct Name" },
    validatorfn: (value) => {
      return validator.isAlpha(value.replaceAll(" ", ""));
    },
  },
  emailValidator: {
    id: "emailValidator",
    massege: {
      ar: "يرجى ادخال بريد الكتروني صحيح",
      en: "Please enter a correct Email",
    },
    validatorfn: (value) => {
      return validator.isEmail(value);
    },
  },
  passwordStrength: {
    id: "passwordStrength",
    massege: {
      ar: "كلمة السر غير قوية",
      en: "Password is not Strong",
    },
    validatorfn: (value) => {
      return validator.isStrongPassword(value);
    },
  },
  phoneNumberValidator: {
    id: "passwordStrength",
    massege: {
      ar: "رقم الهاتف غير صحيح",
      en: "Phone Number is not correct",
    },
  },
};
const numbersOnly = (
  e,
  props = { type: "est", replaceWith: "-", maxNumber: "20" }
) => {
  const { type, replaceWith, maxNumber } = props;
  e.target.value = e.target.value.replaceAll(/[a-zA-Z]+/g, "");
  e.target.value = e.target.value.replaceAll(/[$&+,:;=?@#|'<>.^*()%!]+/g, "");
  e.target.value = e.target.value.replaceAll(/[\u0621-\u064A]/g, "");
  e.target.value = e.target.value.replaceAll(/[\u0660-\u0669]/g, "");
  if (type !== "est") {
    e.target.value = e.target.value.replace("-", "");
  }
  e.target.value = e.target.value
    .replace(" ", "")
    .replaceAll(";", replaceWith)
    .replaceAll(" ", "")
    .replaceAll("\n", replaceWith)
    .replaceAll(",,", replaceWith)
    .replaceAll(",", replaceWith)
    .replaceAll("\\", replaceWith)
    .replaceAll("/", replaceWith)
    .replaceAll("_", replaceWith)
    .replaceAll("[", replaceWith)
    .replaceAll("]", replaceWith)
    .replaceAll("{", replaceWith)
    .replaceAll("}", replaceWith)
    .replaceAll('"', replaceWith)
    .replaceAll("'", replaceWith)
    .replaceAll("--", "-");
  e.target.value = e.target.value.substr(0, maxNumber);
};
export default defualtValidators;
export { numbersOnly };
