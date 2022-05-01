export function validate(input, type) {
  switch (type) {
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

    default:
      break;
  }

  return true;
}
