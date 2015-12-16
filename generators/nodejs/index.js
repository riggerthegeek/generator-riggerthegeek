/**
 * App
 *
 * Prompts what type of application we want to
 * generate
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var chalk = require("chalk");
var generator = require("yeoman-generator");


/* Files */
var helpers = require("../../helpers");


var Generator = generator.Base.extend({


    initializing: {

        greet: function () {

            this.log(helpers.message("Let's create a " + chalk.bgRed.white("NodeJS") + " application", true));

        }

    },


    prompting: function () {

        var done = this.async();

        this.prompt([{
            type: "input",
            name: "name",
            message: "What's the project name?"
        }], function (answers) {

            this.myAnswers = answers;

            done();

        }.bind(this));

    },


    default: {

    },


    writing: {

    },


    install: {

    },


    end: {

        bye: function () {

            this.log(helpers.message("All done. To run, type " +
                chalk.bgRed.white("grunt serve") +
                " or " +
                chalk.bgRed.white("grunt module") +
                " from the root")
            );

        }

    }


});


module.exports = Generator;
