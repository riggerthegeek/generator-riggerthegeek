/**
 * getDirectories
 */

"use strict";


/* Node modules */
var fs = require("fs");
var path = require("path");


/* Third-party modules */
var _ = require("lodash");


/* Files */


module.exports = function getDirectories (srcpath, exclude) {

    var dirs = fs.readdirSync(srcpath)
        .filter(function (file) {

            return fs.statSync(path.join(srcpath, file)).isDirectory();

        });

    if (exclude) {

        if (_.isArray(exclude) === false) {
            exclude = [exclude];
        }

        _.remove(dirs, function (dir) {
            /* Remove this task */
            return exclude.indexOf(dir) !== -1;
        });

    }

    return dirs;

};
