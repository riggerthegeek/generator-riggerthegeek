/**
 * message
 */

"use strict";


/* Node modules */


/* Third-party modules */
var moment = require("moment");
var yosay = require("yosay");


/* Files */


module.exports = function (message, greet) {

    if (greet) {

        var date = moment();

        var time = "morning";
        if (date.hour() > 12) {
            if (date.hour() < 18) {
                time = "afternoon";
            } else {
                time = "evening";
            }
        }

        message = "Good " + time + ". " + message;

    }

    return yosay(message);

};
