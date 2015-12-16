/**
 * Gruntfile
 *
 * Handles the building of the application.
 *
 * @param grunt
 */

"use strict";


/* Node modules */


/* Third-party modules */
var loader = require("load-grunt-tasks");
var semver = require("semver");
var timer = require("grunt-timer");


/* Files */


module.exports = function (grunt) {

    /* Load all grunt tasks */
    loader(grunt);
    timer.init(grunt);

    var pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({

        config: {
            src: "generators",
            test: "test"
        },


        pkg: pkg,


        jscs: {
            options: {
                config: ".jscsrc"
            },
            src: {
                files: {
                    src: [
                        "./<%= config.src %>/**/*.js"
                    ]
                }
            },
            test: {
                files: {
                    src: [
                        "./<%= config.test %>/**/*.js"
                    ]
                }
            }
        },


        jshint: {
            options: {
                jshintrc: true
            },
            src: {
                files: {
                    src: [
                        "Gruntfile.js",
                        "./<%= config.src %>/**/*.js"
                    ]
                }
            }
        },


        jsonlint: {
            src: {
                src: [
                    "./*.json",
                    "./<%= config.src %>/**/*.json",
                    "./<%= config.test %>/**/*.json"
                ]
            }
        },


        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    require: [
                        function () {
                            var path = require("path");
                            var chai = global.chai = require("chai");
                            var expect = global.expect = chai.expect;
                            var assert = global.assert = require("yeoman-generator").assert;
                            var helpers = global.helpers = require("yeoman-generator").test;

                            global.getRootPath = function (file) {
                                return path.join(__dirname, file);
                            };
                        }
                    ]
                },
                src: [
                    "./<%= config.test %>/unit/**/*.test.js"
                ]
            }
        },


        prompt: {
            npmVersion: {
                options: {
                    questions: [{
                        choices: [{
                            value: "build",
                            name:  "Build:  " + (pkg.version + "-?").yellow + " Unstable, betas, and release candidates."
                        }, {
                            value: "patch",
                            name:  "Patch:  " + semver.inc(pkg.version, "patch").yellow + "   Backwards-compatible bug fixes."
                        }, {
                            value: "minor",
                            name:  "Minor:  " + semver.inc(pkg.version, "minor").yellow + "   Add functionality in a backwards-compatible manner."
                        }, {
                            value: "major",
                            name:  "Major:  " + semver.inc(pkg.version, "major").yellow + "   Incompatible API changes."
                        }, {
                            value: "custom",
                            name:  "Custom: " + "?.?.?".yellow + "   Specify version..."
                        }
                        ],
                        config: "bump.increment",
                        message: "What sort of increment would you like?",
                        type: "list"
                    }, {
                        config: "bump.version",
                        message: "What specific version would you like",
                        type: "input",
                        when: function (answers) {
                            return answers["bump.increment"] === "custom";
                        },
                        validate: function (value) {
                            var valid = semver.valid(value) && true;
                            return valid || "Must be a valid semver, such as 1.2.3-rc1. See " +
                                "http://semver.org/".blue.underline + " for more details.";
                        }
                    }]
                }
            }
        },


        shell: {
            gitPush: {
                command: "git push"
            },
            gitPushTags: {
                command: "git push origin --tags"
            },
            npmVersion: {
                command: function () {
                    var bump = {
                        increment: grunt.config.get("bump.increment"),
                        version: grunt.config.get("bump.version")
                    };

                    var script = bump.increment;

                    if (script === "custom") {
                        script = bump.version;
                    }

                    return "npm version " + script;
                }
            },
            publish: {
                command: "npm publish"
            }
        },


        watch: {
            options: {
                atBegin: true,
                dateFormat: function (time) {
                    grunt.log.writeln("The task finished in " + time + "ms");
                    grunt.log.writeln("Waiting for more changes…");
                }
            },
            test: {
                files: [
                    "Gruntfile.js",
                    "<%= config.src %>/**/*",
                    "<%= config.test %>/**/*.js"
                ],
                tasks: [
                    "test"
                ]
            }
        }

    });


    grunt.registerTask("lint", "Runs code quality tests", [
        "jshint:src",
        "jscs:src",
        "jscs:test",
        "jsonlint:src"
    ]);


    grunt.registerTask("publish", "Publishes a new release to npm", [
        "shell:publish"
    ]);


    grunt.registerTask("tag", "Tags a new release", [
        "prompt:npmVersion",
        "shell:npmVersion",
        "shell:gitPush",
        "shell:gitPushTags"
    ]);


    grunt.registerTask("test", "Runs tests on the application", [
        "lint",
        "unittest"
    ]);


    grunt.registerTask("unittest", "Executes the unit tests", [
        "mochaTest:test"
    ]);

};
