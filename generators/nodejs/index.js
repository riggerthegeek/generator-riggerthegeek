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

                var lang = this.myAnswers.language;

                this.myAnswers.compiled = lang && lang !== "es5";
            }

            if (!this.options.nogreeting) {
                this.log(helpers.message("Let's create a " + chalk.bgRed.white("NodeJS") + " application", true));
            }

        }

    },


    prompting: function () {

    },


    configuring: {

        metaFiles: function () {

            var files = [{
                tpl: "common/_editorconfig.txt",
                dest: ".editorconfig"
            }, {
                tpl: "common/_gitattributes.txt",
                dest: ".gitattributes"
            }, {
                tpl: "common/_gitignore.txt",
                dest: ".gitignore"
            }, {
                tpl: "common/_jscsrc.txt",
                dest: ".jscsrc"
            }, {
                tpl: "common/_jshintrc.txt",
                dest: ".jshintrc"
            }, {
                tpl: "common/_npmignore.txt",
                dest: ".npmignore"
            }, {
                tpl: "common/Gruntfile.txt",
                dest: "Gruntfile.js"
            }, {
                tpl: "common/pkg.txt",
                dest: "package.json"
            }, {
                tpl: "common/README.txt",
                dest: "README.md"
            }];

            _.each(files, function (file) {
                this.fs.copyTpl(this.templatePath(file.tpl), this.destinationPath(file.dest), this.myAnswers);
            }, this);

        }

    },


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

        npmDev: function () {

            this.npmInstall([
                "grunt"
            ], {
                saveDev: true
            });

        }

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
