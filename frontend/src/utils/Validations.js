export function validateEmail(email) {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return EMAIL_REGEX.test(email);
}

export function validatePassword(password) {
  if (password.length >= 8 && password.length <= 25) {
    return true;
  } else {
    return false;
  }
}
