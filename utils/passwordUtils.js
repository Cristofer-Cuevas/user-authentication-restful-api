import crypto from "crypto";

export const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return {
    hash: genHash,
    salt: salt,
  };
};

export const validatePassword = (password, hash, salt) => {
  if (!hash || !salt) {
    return false;
  } else {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return hash === hashVerify;
  }
};
