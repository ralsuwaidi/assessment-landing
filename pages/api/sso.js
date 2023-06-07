// pages/api/idp/sso.js

import nextConnect from 'next-connect';
import passport from '../../lib/api/saml';

const handler = nextConnect();

handler.use(passport.initialize());

handler.post(passport.authenticate('saml', { RelayState: 'www.pluralsight.com' }));

export default handler;
