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
        "lib/phantomjs-testrunner.js",
        "lib/parser-runner.js",
        "tests/test-server.js"
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

  grunt.registerTask( "start-server", function() {
    grunt.log.writeln( "Starting Testing Server" );
    grunt.util.spawn({
      cmd: "node",
      args: [ "tests/test-server.js" ]
    }, function( error, result, code ) {
      console.log( result );
    });
  });

  grunt.registerTask( "stop-server", function() {
    grunt.log.writeln( "Killing Test Server" );
    grunt.util.spawn({
      cmd: "killall",
      args: [ "node" ]
    }, function( error, result, code ) {
      console.log( result );
    });
  });

  grunt.registerTask( "build", [ "uglify" ] );
  grunt.registerTask( "default", [ "jshint", "uglify" ]);
};
