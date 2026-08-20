// Turns Better Auth's error codes into wording a traveller can act on
const messages = {
  INVALID_OTP: "That code isn't right. Check the digits and try again.",
  OTP_EXPIRED: "That code has expired. Request a new one below.",
  TOO_MANY_ATTEMPTS: "Too many wrong attempts. Request a new code below.",
  USER_NOT_FOUND: "No account found for this email address.",
  INVALID_EMAIL: "Please enter a valid email address.",
  EMAIL_NOT_VERIFIED: "Please verify your email address first.",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters.",
};

export function otpErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error) return fallback;
  return messages[error.code] ?? error.message ?? fallback;
}
