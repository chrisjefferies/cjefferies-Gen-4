module.exports = function(grunt) {
	
	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {   
			dist: {
				src: [
					'dev/top.html', 
					'dev/_temp/style.css'
				],
				dest: 'dev/_temp/master.html',
			}
		},
		less: {
			development: {
				files: {
					'css/style.css': 'less/style.less'
				}
			}
		},
		watch: {
			scripts: {
				files: ['less/*.less'],
				tasks: ['default']
			}
		},
		postcss: {
			options: {
				map: {
					inline: false, // save all sourcemaps as separate files...
					annotation: 'css/maps/' // ...to the specified directory
				},
				processors: [
					require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
					require('cssnano')() // minify the result
				]
			},
			dist: {
				src: 'css/style.css'
			}
		}
	});

	// Plugins
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-ftp-deploy');

	// Tasks
	grunt.registerTask('default', ['less']);
	grunt.registerTask('deploy', ['less', 'postcss']);
};


