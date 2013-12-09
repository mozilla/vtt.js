module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    jshint: {
      options: {
        esnext: true,
        indent: 2,
        expr: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        newcap: true,
        unused: true,
        trailing: true,
        browser: true,
        node: true
      },
      files: [
        "vtt.js",
        "lib/vttcue.js",
        "lib/vttregion.js",
        "lib/node-vtt.js"
      ]
    },

    uglify: {
      options: {
        banner: "/*! vtt.js - https://github.com/mozilla/vtt.js (built on <%= grunt.template.today('dd-mm-yyyy') %>) */\n"
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
    },

    concat: {
      options: {
        banner: "/*! vtt.js - https://github.com/mozilla/vtt.js (built on <%= grunt.template.today('dd-mm-yyyy') %>) */\n"
      },
      dist: {
        src: [
          "lib/stringencoding/encoding.js",
          "lib/vttcue.js",
          "lib/vttregion.js",
          "vtt.js"
        ],
        dest: "dist/vtt.js"
      }
    }

  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-contrib-uglify" );
  grunt.loadNpmTasks( "grunt-contrib-concat" );

  grunt.registerTask( "build", [ "uglify", "concat" ] );
  grunt.registerTask( "default", [ "jshint", "build" ]);
};
