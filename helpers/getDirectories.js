/**
 * getDirectories
 */

"use strict";


/* Node modules */
var fs = require("fs");
var path = require("path");


/* Third-party modules */


/* Files */


module.exports = function getDirectories (srcpath) {

    return fs.readdirSync(srcpath)
        .filter(function (file) {

            return fs.statSync(path.join(srcpath, file)).isDirectory();

        });

};
