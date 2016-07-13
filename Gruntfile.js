module.exports = function (grunt) {

	// ===========================================================================
	// CONFIGURE GRUNT ===========================================================
	// ===========================================================================
	grunt.initConfig({

		// get the configuration info from package.json ----------------------------
		pkg: grunt.file.readJSON('package.json'),
		
		// ===========================================================================
		// PATH SETTING ==============================================================
		// ===========================================================================
		paths: {
			img: 'src/images/',
			imgOutput: 'images/',
			css: 'src/scss/',
			cssOutput: 'css/',
			js: 'src/js/',
			jsOutput: 'js/'
		},
		bower_concat: {
			all: {
				dest: '<%= paths.jsOutput %>/bower.min.js',
				exclude: [] // eg.'modernizr', 'jquery'
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			js: {
				src: '<%= paths.js %>**/*.js',
				dest: '<%= paths.jsOutput %>/common.min.js'
			}
		},
		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'<%= paths.jsOutput %>/bower.min.js': '<%= paths.jsOutput %>/bower.min.js',
					'<%= paths.jsOutput %>/common.min.js': '<%= paths.jsOutput %>/common.min.js'
				}
			}
		},
		jshint: {
			options: {
				reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
			},
			// when this task is run, lint the Gruntfile and all js files in src
			build: ['Grunfile.js', '<%= paths.js %>**/*.js']
		},

		pngmin: {
			options: {
				ext: '.png'
			},
			compile: {
				files: [
					{
						expand: true,
						cwd: '<%= paths.img %>',
						src: '**/*.png',
						dest: '<%= paths.imgOutput %>'
					}
				]
			}
		},
		imagemin: {
			dev: {
				files: [
					{
						expand: true,
						cwd: '<%= paths.img %>',
						src: '**/*.{jpg,gif}',
						dest: '<%= paths.imgOutput %>'
					}
				]
			}
		},
		compass: {
			dev: {
				options: {
					config: 'config.rb'
				}
			},
			prod: {
				options: {
					config: 'config-prod.rb'
				}
			}
		},
		grunticon: {
			myIcons: {
				files: [{
					expand: true,
					cwd: '<%= paths.img %>svg',
					src: ['*.svg', '*.png'],
					dest: "<%= paths.imgOutput %>svg"
				}],
				options: {
					enhanceSVG: true,
					previewhtml : 'icon.html'
				}
			}
		},
		watch: {
			scripts: {
				files: '<%= paths.js %>/*.js',
				tasks: ['jshint']
			},
			img: {
				files: ['<%= paths.img %>**/*.{png,jpg,gif}'],
				tasks: ['imagemin:dev', 'pngmin']
			},
			css: {
				files: ['<%= paths.css %>**/*.scss'],
				tasks: ['compass:dev']
			}
		}

	});

	// ===========================================================================
	// ENVIRONMENT SETTING =======================================================
	// ===========================================================================
	grunt.registerTask('default', ['bower_concat', 'concat', 'jshint', 'imagemin:dev', 'pngmin', 'compass:dev', 'grunticon:myIcons']);
	grunt.registerTask('prod', ['bower_concat', 'concat', 'jshint', 'uglify', 'imagemin:dev', 'pngmin', 'compass:prod', 'grunticon:myIcons']);
	

	// ===========================================================================
	// LOAD GRUNT PLUGINS ========================================================
	// ===========================================================================
	// we can only load these if they are in our package.json
	// make sure you have run npm install so our app can find these
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-contrib-watch');

};