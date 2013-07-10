module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    jshint: {
      options: {
        esnext: true,
        indent: 2,
        expr: true
      },
      files: [ "vtt.js" ]
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.registerTask( "default", [ "jshint" ]);
};
