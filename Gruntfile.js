module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      javascript: {
        src: ['js/**/*.js']
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      javascript: {
        files: '<%= jshint.javascript.src %>',
        tasks: ['jshint:src']
      },

    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'jshint'
  ]);

};
