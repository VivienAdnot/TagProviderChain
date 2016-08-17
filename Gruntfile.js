module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            JSTemplateApplication: {
                src: ['PlaytemTemplate/**/*.js'],
                dest: '_dist/template.js'
            },
            JSTemplateTests: {
                src: ['PlaytemTemplateTests/qunit/**/*.js'],
                dest: 'PlaytemTemplateTests/_build/tests.js'
            }
        },
        
        copy: {
            options: {
                separator: '\n\n',
                punctuation: ''
            },
            test: {
                files: {
                    "PlaytemTemplateTests/_source/template.js": ['_dist/template.js'],
                    "displayPlaytemTemplate/_source/template.js": ['_dist/template.js']
                }
            }
        },
        
        connect: {
            test: {
                options: {
                    port: 8081,
                    hostname: '127.0.0.1',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['concat:JSTemplateApplication', 'concat:JSTemplateTests', 'copy:test', 'connect:test']);
};