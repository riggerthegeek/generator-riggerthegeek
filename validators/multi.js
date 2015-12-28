/**
 * multi
 */

"use strict";


/* Node modules */


/* Third-party modules */


/* Files */


module.exports = function (validators) {

    return function (input) {

        try {

            validators.forEach(function (validator) {

                var valid = validator(input);

                if (valid !== true) {
                    throw valid;
                }

            });

        } catch (err) {
            return err;
        }

        return true;

    }

};
