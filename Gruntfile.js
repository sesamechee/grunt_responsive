'use strict';

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
			proxy: "http://github.ds078.pacim.local/grunt_responsive/",
			img: 'src/images/',
			imgOutput: 'images/',
			css: 'src/scss/',
			cssOutput: 'css/',
			js: 'src/js/',
			jsOutput: 'js/'
		},
		bower_concat: {
			all: {
				dest: {
					js: '<%= paths.jsOutput %>/bower.js',
					css: '<%= paths.cssOutput %>/bower.css'
				},
				exclude: [] // eg.'modernizr', 'smoothscroll-for-websites'
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			js: {
				src: '<%= paths.js %>**/*.js',
				dest: '<%= paths.jsOutput %>/common.js'
			}
		},
		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'<%= paths.jsOutput %>/bower.js': '<%= paths.jsOutput %>/bower.js',
					'<%= paths.jsOutput %>/common.js': '<%= paths.jsOutput %>/common.js'
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
		sass: {
			options: {
				sourceMap: false
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= paths.css %>',
					src: ['**/*.scss'],
					dest: '<%= paths.cssOutput %>',
					ext: '.css'
				}]
			}
		},
		postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['ie 8', 'last 3 versions']
                    })
                ]
            },
			dist: {
			  src: '<%= paths.cssOutput %>**/*.css'
			}
        },
		watch: {
			scripts: {
				files: '<%= paths.js %>/*.js',
				tasks: ['jshint', 'bower_concat', 'concat']
			},
			img: {
				files: ['<%= paths.img %>**/*.{png,jpg,gif}'],
				tasks: ['imagemin:dev', 'pngmin']
			},
			css: {
				files: ['<%= paths.css %>**/*.scss'],
				tasks: ['sass', 'postcss']
			},
			svg: {
				files: ['<%= paths.img %>svg/*.svg'],
				tasks: ['grunticon:myIcons']
			}
		}

	});

	// ===========================================================================
	// ENVIRONMENT SETTING =======================================================
	// ===========================================================================
	grunt.registerTask('default', ['jshint', 'bower_concat', 'concat', 'imagemin:dev', 'pngmin', 'sass' , 'grunticon:myIcons', 'watch']);
	grunt.registerTask('prod', ['jshint', 'bower_concat', 'concat',  'uglify', 'imagemin:dev', 'pngmin', 'sass' , 'grunticon:myIcons']);
	

	// ===========================================================================
	// LOAD GRUNT PLUGINS ========================================================
	// ===========================================================================
	// we can only load these if they are in our package.json
	// make sure you have run npm install so our app can find these
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-contrib-watch');

};
