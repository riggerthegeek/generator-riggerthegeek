/**
 * App
 *
 * Prompts what type of application we want to
 * generate
 */

"use strict";


/* Node modules */
var path = require("path");


/* Third-party modules */
var _ = require("lodash");
var chalk = require("chalk");
var generator = require("yeoman-generator");


/* Files */
var helpers = require("../../helpers");
var validators = require("../../validators");


var tasks = helpers.getDirectories(path.join(__dirname, ".."), "app");


var languages = [
    "es5",
    "es6",
    "typescript"
];


var Generator = generator.Base.extend({


    initializing: {

        greet: function () {

            this.log(helpers.message("Let's create a " + chalk.bgRed.white("RiggerTheGeek") + " application", true));

        }

    },


    prompting: function () {

        var done = this.async();

        this.prompt([{
            type: "list",
            name: "task",
            message: "What project do you want to install?",
            choices: tasks
        }, {
            type: "input",
            name: "name",
            message: "What's the project name?",
            default: this.config.get("name") || this.appname,
            validate: validators.required
        }, {
            type: "input",
            name: "description",
            message: "Project description",
            default: this.config.get("description"),
            validate: validators.required
        }, {
            type: "input",
            name: "author_name",
            message: "Your name",
            default: this.config.get("author_name"),
            validate: validators.required
        }, {
            type: "input",
            name: "author_email",
            message: "Your email",
            default: this.config.get("author_email"),
            validate: validators.multi([
                validators.required,
                validators.email
            ])
        }, {
            type: "list",
            name: "language",
            message: "What language do you want to use?",
            choices: languages,
            default: this.config.get("language") || "typescript"
        }], function (answers) {

            this.myAnswers = answers;

            /* Generate the npm package name */
            answers.pkg = answers.name.replace(/\s/g, "-");

            done();

        }.bind(this));

    },


    configuring: {

    },


    default: {

    },


    writing: {

    },


    install: {

        task: function () {

            this.composeWith("riggerthegeek:" + this.myAnswers.task, {
                options: {
                    answers: this.myAnswers,
                    nogreeting: true
                }
            });

        }

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
