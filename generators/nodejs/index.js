/**
 * NodeJS
 *
 * Builds a NodeJS application
 */

"use strict";


/* Node modules */


/* Third-party modules */
var _ = require("lodash");
var chalk = require("chalk");
var generator = require("yeoman-generator");


/* Files */
var helpers = require("../../helpers");
var validators = require("../../validators");


var Generator = generator.Base.extend({


    initializing: {

        greet: function () {

            this.myAnswers = {};

            if (_.isObject(this.options.answers)) {
                this.myAnswers = this.options.answers;
            }

            if (!this.options.nogreeting) {
                this.log(helpers.message("Let's create a " + chalk.bgRed.white("NodeJS") + " application", true));
            }

        }

    },


    //prompting: function () {
    //
    //    var done = this.async();
    //
    //    this.prompt([
    //    ], function (answers) {
    //
    //        _.extend(this.myAnswers, answers);
    //
    //        done();
    //
    //    }.bind(this));
    //
    //},


    default: {

    },


    writing: {

        saveConfig: function () {

            this.myAnswers = _.reduce(this.myAnswers, function (result, answer, key) {

                /* Set as undefined so parameter still available to the template */
                if (answer === "") {
                    answer = undefined;
                }

                result[key] = answer;

                return result;

            }, {});

            this.config.set(this.myAnswers);
            this.config.save();

        },

        copyTpl: function () {



        }

    },


    install: {

    },


    end: {

        bye: function () {

            if (!this.options.nogreeting) {

                this.log(helpers.message("All done. To run, type " +
                    chalk.bgRed.white("grunt serve") +
                    " or " +
                    chalk.bgRed.white("grunt module") +
                    " from the root")
                );

            }

        }

    }


});


module.exports = Generator;
