var exec = require("child_process").exec,
    distFiles = [
      "lib/vttcue.js",
      "lib/vttregion.js",
      "lib/vtt.js",
      "node_modules/text-encoding/lib/encoding.js"
    ];

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
      files: [ "lib/*", "tests/**/*.js" ]
    },

    uglify: {
      options: {
        banner: "/*! vtt.js - https://github.com/mozilla/vtt.js (built on <%= grunt.template.today('dd-mm-yyyy') %>) */\n"
      },
      dist: {
        files: {
          "dist/vtt.min.js": distFiles
        }
      },
      dev: {
        files: {
          "dev_build/vtt.min.js": distFiles
        }
      }
    },

    concat: {
      options: {
        banner: "/*! vtt.js - https://github.com/mozilla/vtt.js (built on <%= grunt.template.today('dd-mm-yyyy') %>) */\n"
      },
      dist: {
        src: distFiles,
        dest: "dist/vtt.js"
      },
      dev: {
        src: distFiles,
        dest: "dev_build/vtt.js"
      }
    },

    bump: {
      options: {
        files: [ "package.json", "bower.json" ],
        updateConfigs: [],
        commit: true,
        commitMessage: "Release v%VERSION%",
        commitFiles: [ "package.json", "bower.json", "dist/*" ],
        createTag: true,
        tagName: "v%VERSION%",
        tagMessage: "Version %VERSION%",
        push: true,
        pushTo: "git@github.com:mozilla/vtt.js.git",
      }
    }

  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-contrib-uglify" );
  grunt.loadNpmTasks( "grunt-contrib-concat" );
  grunt.loadNpmTasks( "grunt-bump" );

  grunt.registerTask( "build", [ "uglify:dist", "concat:dist" ] );
  grunt.registerTask( "dev-build", [ "uglify:dev", "concat:dev" ])
  grunt.registerTask( "default", [ "jshint", "dev-build" ]);

  grunt.registerTask( "stage-dist", "Stage dist files.", function() {
    exec( "git add dist/*", this.async() );
  });

  grunt.registerTask( "release", "Build the distributables and bump the version.", function(arg) {
    grunt.task.run( "build", "stage-dist", "bump:" + arg );
  });
};
