// src/utils/validators.js
export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isValidPassword(password) {
  return password.length >= 6;
}

export function isImageFile(file) {
  return file && file.type.startsWith('image/');
}
