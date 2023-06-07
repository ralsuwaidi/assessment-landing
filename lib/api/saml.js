const fs = require('fs');
const path = require('path');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const samlStrategy = new SamlStrategy(
  {
    // Entity ID
    issuer: 'http://localhost:3000/idp/metadata',
    // Single Sign-On Service endpoint
    entryPoint: 'http://localhost:3000/api/sso/',
    // Single Logout Service endpoint
    // logoutUrl: 'http://localhost:3000/idp/slo/post/',
    // SAML signing and encryption
    privateKey: fs.readFileSync(path.join('/Users/rashed/dev/codershq/assessment/assessment/certificates/production/private.key'), 'utf-8'),
    cert: fs.readFileSync(path.join('/Users/rashed/dev/codershq/assessment/assessment/certificates/production/public.cert'), 'utf-8'),
    decryptionPvk: fs.readFileSync(path.join('/Users/rashed/dev/codershq/assessment/assessment/certificates/production/private.key'), 'utf-8'),
    signatureAlgorithm: 'sha256',
    digestAlgorithm: 'sha256',
    // Attribute mapping
    attributeMapping: {
      pluralSightEmail: 'email',
      pluralSightFirstName: 'firstName',
      pluralSightLastName: 'lastName',
    },
  },
  (profile, done) => {
    // Profile processing
    return done(null, profile);
  }
);

passport.use(samlStrategy);
module.exports = passport;