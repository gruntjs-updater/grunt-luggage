/*
 * grunt-luggage
 * https://github.com/darkylin/luggage
 *
 * Copyright (c) 2015 darkylin
 * Licensed under the GNU license.
 */

'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        luggage: {
            dev: {
                options: {
                    tpl: 'test/template.hbs'
                },
                files:[{
                    expand:true,
                    cwd: 'test/',
                    src:['html/*'],
                    dest:'dist'
                }]
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('default', ['luggage']);

};
