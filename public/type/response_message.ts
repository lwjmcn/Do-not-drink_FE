enum ResponseMessage {
  // common
  SUCCESS = "SUCCESS",
  VALIDATION_FAIL = "Validation failed",
  DATABASE_ERROR = "Database error",
  AUTHORIZATION_FAIL = "Authorization failed",

  // user
  DUPLICATE_ID = "Duplicate id",
  DUPLICATE_EMAIL = "Duplicate email",
  NO_SESSION_INFO = "Can't find the session information",
  SIGN_IN_FAIL = "Login information mistmatch",
  NO_EMAIL = "Can't find the email address",
  MAIL_SEND_FAIL = "Failed to send an email",
  VERIFICATION_FAIL = "Verification failed",

  // user
  NOT_FRIEND = "Not a friend",

  // budget
  BUDGET_UNDEFINED = "Budget is not defined",
  BUDGET_ALREADY_DEFINED = "Budget is already defined",

  // friend
  USER_NOT_FOUND = "User not found",
  ALREADY_FRIEND = "Already a friend",
  ALREADY_REQUESTED = "Already requested",
  SELF_REQUEST = "Can't request to yourself",

  // ocr
  OCR_FAIL = "OCR failed",
}
export default ResponseMessage;
