enum ResponseMessage {
  SUCCESS = "SUCCESS",
  VALIDATION_FAIL = "Validation failed",
  DUPLICATE_ID = "Duplicate id",
  DUPLICATE_EMAIL = "Duplicate email",
  NO_SESSION_INFO = "Can't find the session information",
  SIGN_IN_FAIL = "Login information mistmatch",
  NO_EMAIL = "Can't find the email address",
  MAIL_SEND_FAIL = "Failed to send an email",
  VERIFICATION_FAIL = "Verification failed",
  DATABASE_ERROR = "Database error",
  NO_PERMISSION = "No permission",
}

export default ResponseMessage;
