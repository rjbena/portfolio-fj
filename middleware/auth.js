import jwt from "express-jwt";
import JwksRsa from "jwks-rsa";
import jwks from "jwks-rsa";

//Authentication middleware
//This middleware will check access token in authorization headers
// of a request
//It will verify access token against Auth0 JSON web key set

export const checkJwt = jwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://dev-kvt85q4m.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://dev-kvt85q4m.us.auth0.com/api/v2/",
  issuer: "https://dev-kvt85q4m.us.auth0.com/",
  algorithms: ["RS256"],
});
