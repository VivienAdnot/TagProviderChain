module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            app: {
                src: ['app/**/*.js'],
                dest: '_dist/playtemEmbeddedApp.js'
            },
            appTests: {
                src: ['appTest/qunit/**/*.js'],
                dest: 'appTest/_build/tests.js'
            }
        },
        
        copy: {
            options: {
                separator: '\n\n',
                punctuation: ''
            },
            test: {
                files: {
                    "appTest/_source/template.js": ['_dist/template.js'],
                    "appDisplay/_source/template.js": ['_dist/template.js']
                }
            }
        },
        
        connect: {
            test: {
                options: {
                    port: 8082,
                    hostname: '127.0.0.1',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['concat:app', 'concat:appTests', 'copy:test']);
};