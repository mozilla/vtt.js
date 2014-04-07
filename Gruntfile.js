var exec = require("child_process").exec;

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
        "lib/vtt.js",
        "lib/vttcue.js",
        "lib/vttcue-extended.js",
        "lib/vttregion.js",
        "lib/vttregion-extended.js",
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
            "lib/vttcue.js",
            "lib/vttregion.js",
            "lib/vtt.js",
            "node_modules/text-encoding/lib/encoding.js"
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
          "lib/vttcue.js",
          "lib/vttregion.js",
          "lib/vtt.js",
          "node_modules/text-encoding/lib/encoding.js"
        ],
        dest: "dist/vtt.js"
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

  grunt.registerTask( "build", [ "uglify", "concat" ] );
  grunt.registerTask( "default", [ "jshint", "build" ]);

  grunt.registerTask( "stage-dist", "Stage dist files.", function() {
    exec( "git add dist/*", this.async() );
  });

  grunt.registerTask( "release", "Build the distributables and bump the version.", function(arg) {
    grunt.task.run( "build", "stage-dist", "bump:" + arg );
  });
};
