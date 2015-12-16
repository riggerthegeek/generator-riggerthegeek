/**
 * alpha
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function validateAlpha (input) {

    if (input === "") {
        return true;
    }

    if (input.match(/^[A-Z]+$/i) === null) {
        return "Only letters are allowed";
    }

    return true;
};
