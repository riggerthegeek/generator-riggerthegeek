/**
 * integer
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function validateInteger (input) {

    if (_.isNumber(input)) {
        /* Cast to a string */
        input = String(input);
    }

    if (_.isString(input) === false || input.match(/^\d+$/) === null || input === "0") {
        return "Can only accept positive integers";
    }

    return true;

};
