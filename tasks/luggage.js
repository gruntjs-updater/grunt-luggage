/*
 * grunt-luggage
 * https://github.com/darkylin/luggage
 *
 * Copyright (c) 2015 darkylin
 * Licensed under the GNU license.
 */

'use strict';

module.exports = function (grunt) {

    var handlebars = require('handlebars'),
        path = require('path');
    grunt.registerMultiTask('luggage', 'package static resources', function () {
        var options = this.options({vars: {}});
        var src = options.from,
            dist = options.to,
            tpl = grunt.file.read(options.tpl),
            vars = options.vars;
        vars.static = dist.static;
        this.files.forEach(function (file) {
            file.src.forEach(function (srcPath) {
                grunt.file.expand(srcPath).forEach(function (realFile) {
                    var tplData = {
                        body: handlebars.compile(grunt.file.read(realFile))(vars),
                        vars: vars,
                        styleFolder: dist.style,
                        scriptFolder: dist.script
                    };
                    ['style', 'script'].forEach(function (type) {
                        var fileName = path.basename(realFile,path.extname(realFile));
                        var pattern = path.join(src[type], fileName) + '*'
                        var file = grunt.file.expand(pattern)[0];
                        console.log(file)
                        if (file) {
                            tplData['page' + type[0].toUpperCase() + type.slice(1)] = path.basename(file);
                        }
                    });
                    grunt.file.write(path.join(dist.html, path.basename(realFile)), handlebars.compile(tpl)(tplData));
                });
            });
        });


    });

};
