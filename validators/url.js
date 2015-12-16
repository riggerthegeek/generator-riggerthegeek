/**
 * url
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var validUrl = require("valid-url");


/* Files */


module.exports = function validateUrl (input) {

    if (_.isEmpty(input)) {
        return true;
    }

    if (validUrl.isUri(input)) {
        return true;
    }

    return "That doesn't appear to be a valid URL";

};
