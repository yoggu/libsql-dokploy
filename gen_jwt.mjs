import { generateKeyPair, SignJWT, exportJWK, exportSPKI } from "jose";
import fs from "fs";

(async () => {
  const { publicKey, privateKey } = await generateKeyPair("EdDSA", {
    crv: "Ed25519",
  });

  const pubKeyPem = await exportSPKI(publicKey);
  fs.writeFileSync("jwt_key.pem", pubKeyPem);

  const publicJwk = await exportJWK(publicKey);

  // The 'x' parameter contains the base64url-encoded raw public key bytes
  const pubKeyBase64 = publicJwk.x;

  fs.writeFileSync("jwt_key.base64", pubKeyBase64);

  const exp = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

  const token = await new SignJWT({ exp })
    .setProtectedHeader({ alg: "EdDSA" })
    .sign(privateKey);

  // Create the read-only JWT
  const roToken = await new SignJWT({ exp, a: "ro" })
    .setProtectedHeader({ alg: "EdDSA" })
    .sign(privateKey);

  console.log("Public Key base64:", pubKeyBase64);
  console.log(`Full access: ${token}`);
  console.log(`Read-only:   ${roToken}`);
})();
