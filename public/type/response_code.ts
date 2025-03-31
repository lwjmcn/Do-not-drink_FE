enum ResponseCode {
  // common
  SUCCESS = "SUCCESS",
  VALIDATION_FAIL = "VLF",
  DATABASE_ERROR = "DBE",
  AUTHORIZATION_FAIL = "AUF",
  NO_PERMISSION = "NP",

  // auth
  DUPLICATE_ID = "DI",
  DUPLICATE_EMAIL = "DE",
  NO_SESSION_INFO = "NSI",
  SIGN_IN_FAIL = "SIF",
  NO_EMAIL = "NE",
  MAIL_SEND_FAIL = "MSF",
  VERIFICATION_FAIL = "VRF",

  // user
  NOT_FRIEND = "NF",

  // budget
  BUDGET_UNDEFINED = "BU",
  BUDGET_ALREADY_DEFINED = "BAD",

  // friend
  USER_NOT_FOUND = "UNF",
  ALREADY_FRIEND = "AF",
  ALREADY_REQUESTED = "AR",
  SELF_REQUEST = "SR",

  // ocr
  OCR_FAIL = "OF",
}
export default ResponseCode;
