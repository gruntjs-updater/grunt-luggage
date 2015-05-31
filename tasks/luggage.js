/*
 * grunt-luggage
 * https://github.com/darkylin/luggage
 *
 * Copyright (c) 2015 darkylin
 * Licensed under the GNU license.
 */

'use strict';
var Q = require('q'),
    fs = require('fs'),
    fse = require('fs-extra'),
    readfile = Q.denodeify(fs.readFile),
    filestat = Q.denodeify(fs.stat),
    handlebars = require('handlebars'),
    path = require('path');

module.exports = function (grunt) {
    grunt.registerMultiTask('luggage', 'package static resources', function () {
        var options = this.options({vars: {}});
        var cwd = options.cwd || '',
            vars = options.vars,
            done = this.async(),
            taskCount = 0;
        this.files.forEach(function (file) {

            var src = file.src,
                dest = file.dest;
            // normalize cwd
            if (cwd[cwd.length - 1] !== '/' && cwd.length !== 0) {
                cwd += '/';
            }
            var cwdLength = cwd.length;
            // if one src path has cwd, normalize it.
            var realSrc = [];
            src = src.map(function (item) {
                if (item.indexOf(cwd) == 0) {
                    realSrc.push(item);
                    return item.slice(cwdLength);
                } else {
                    realSrc.push(cwd + item);
                    return item;
                }
            });

            //readBodyTpl
            realSrc.forEach(function (srcFile, srcFileIndex) {
                taskCount++;
                readfile(srcFile).done(function (bodyTpl) {
                    taskCount--;
                    var tplData = {
                        body: bodyTpl.toString(),
                        vars: vars
                    };

                    readfile(options.tpl).done(function (tpl) {
                        taskCount++;
                        fse.outputFile(
                            dest,
                            handlebars.compile(tpl.toString())(tplData),
                            function () {
                                taskCount--;
                                if (taskCount == 0) {
                                    done();
                                }
                            }
                        );
                    })
                });
            });
        });


    });

};
