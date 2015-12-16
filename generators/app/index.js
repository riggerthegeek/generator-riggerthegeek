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


var tasks = helpers.getDirectories(path.join(__dirname, ".."));

_.remove(tasks, function (task) {
    /* Remove this task */
    return task === "app";
});


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

        task: function () {

            this.composeWith("riggerthegeek:" + this.myAnswers.task);

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
