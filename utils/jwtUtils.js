import fs from "fs";
import jsonwebtoken from "jsonwebtoken";

// Issuing JWT

const PRIV_KEY = fs.readFileSync("id_rsa_priv.pem", { encoding: "utf8" }, import.meta.url);
const issueJwt = (userId) => {
  const payload = {
    sub: userId,
    expiresIn: "2d",
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "2d",
  });

  return {
    token: "Bearer " + signedToken,
  };
};

export default issueJwt;
