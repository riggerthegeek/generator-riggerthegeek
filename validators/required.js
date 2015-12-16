/**
 * required
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");


/* Files */


module.exports = function validateRequired (input) {
    if (_.isString(input) === false || input === "") {
        return "Required field";
    }
    return true;
};
