

var express = require('express');
var oauthService = require('../service/oauthService');
var authService = require('../service/authService');

var oauthRouter = express.Router();

var oauthRoute = oauthRouter.route('/authorize');

var tokenRoute = oauthRouter.route('/token');


/** Authorize */
oauthRoute.get(authService.isAuthenticated, oauthService.authorization);
oauthRoute.post(authService.isAuthenticated, oauthService.decision);

/** Token */
tokenRoute.post(authService.isClientAuthenticated, oauthService.token);


module.exports = oauthRouter;