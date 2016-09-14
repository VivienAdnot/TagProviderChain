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
                    "appTest/_source/playtemEmbeddedApp.js": ['_dist/playtemEmbeddedApp.js'],
                    "appDisplay/_source/playtemEmbeddedApp.js": ['_dist/playtemEmbeddedApp.js']
                }
            }
        },
        
        connect: {
            root: {
                options: {
                    port: 8083,
                    hostname: '127.0.0.1',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['concat:app', 'copy:test']);

    grunt.registerTask('serve', ['concat:app', 'copy:test', 'connect:root']);
    
    grunt.registerTask('test', ['concat:app', 'concat:appTests', 'copy:test', 'connect:root']);
};