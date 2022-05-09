export function validate(input, type) {
  switch (type) {
    case "name":
      if (input.trim() == "" || input.trim() == null) {
        return false;
      }
      break;
    case "address":
      if (input.trim() == "" || input.trim() == null) {
        return false;
      }
      break;
    case "email":
      if (
        input
          .trim()
          .match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          ) == null
      ) {
        return false;
      }
      break;

    case "password":
      if (
        input.trim() === "" ||
        input.trim().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) ==
        null
      ) {
        return false;
      }
      break;

    case "confirm-password":
      if (input.confirmPassword !== input.password) {
        return false;
      }
      break;
    case "phone":
      if (input.trim() === "" ||
        input.trim().match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g) ==
        null) {
        return false;
      }
      break;

    default:
      break;
  }

  return true;
}
