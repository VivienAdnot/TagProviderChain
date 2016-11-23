module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            app: {
                src: ['app/**/*.js'],
                dest: 'dist/_source/playtemEmbeddedApp.js'
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

    grunt.registerTask('build', ['concat:app']);
    grunt.registerTask('serve', ['concat:app', 'connect:root']);
};