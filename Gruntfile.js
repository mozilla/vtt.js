module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    jshint: {
      options: {
        esnext: true,
        indent: 2,
        expr: true
      },
      files: [
        "vtt.js",
        "lib/vttcue.js",
        "lib/vttregion.js",
        "lib/util.js",
        "lib/node-vtt.js"
      ]
    },

    uglify: {
      options: {
        banner: "/*! vtt.js - https://github.com/andreasgal/vtt.js (built on <%= grunt.template.today('dd-mm-yyyy') %>) */\n"
      },
      dist: {
        files: {
          "dist/vtt.min.js": [ 
            "lib/stringencoding/encoding.js",
            "lib/vttcue.js",
            "lib/vttregion.js",
            "vtt.js"
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-contrib-uglify" );

  grunt.registerTask( "build", [ "uglify" ] );
  grunt.registerTask( "default", [ "jshint", "uglify" ]);
};
