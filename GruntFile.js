module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      war: {
          target: {
            options: {
              war_dist_folder: '<%= build_dir %>',
              war_name: 'grunt-magic',
              webxml_welcome: 'index.html',
              webxml_display_name: 'Grunt WAR',
              webxml_mime_mapping: [ { extension: 'woff', mime_type: 'application/font-woff' } ]
            },
            files: [
              {
                expand: true,
                cwd: '<%= build_dir %>',
                src: ['**'],
                dest: ''
              }
            ]
          }
        }

  });

  grunt.loadNpmTasks('grunt-war');
};
