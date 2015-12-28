/**
 * email
 */

"use strict";


/* Node modules */


/* Third-party modules */
var validation = require("datautils").validation;


/* Files */


module.exports = function (input) {

    try {
        validation.email(input);

        return true;
    } catch (err) {

        return "Not an email";

    }

};
