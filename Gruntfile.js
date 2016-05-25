module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            html: {
                files: ['src/*.html'],
                tasks: ['htmlmin:dev'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['src/css/*.scss'],
                tasks: ['concat:css', 'sass'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: [
                    "src/js/*/*.js",
                ],
                tasks: ['concat:js'],
                options: {
                    spawn: false
                }
            },
        },
        concat: {
            css: {
                src: [
                    "src/css/app.scss",
                ],
                dest: 'src/css/production.scss'
            },
            js: {
                src: [
                    "bower_components/jquery/dist/jquery.min.js",
                    "bower_components/angular/angular.min.js",
                    "bower_components/angular-sanitize/angular-sanitize.min.js",
                    "src/js/lib/*.js",
                    "src/js/app.js",
                    "src/js/services.js",
                    "src/js/common/*.js",
                    "src/js/controllers/*.js",
                    "src/js/directives/*.js",
                    "src/js/factories/*.js",
                    "src/js/filters/*.js",
                    "src/js/services/*.js"
                ],
                dest: 'public/js/production.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded' // 'compressed'
                },
                files: {
                    'src/css/production.css': 'src/css/production.scss'
                }
            }
        },
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/index.html': 'src/index.html'
                }
            },
            dev: {
                files: {
                    'public/index.html': 'src/index.html'
                }
            }
        },
        cssmin: {
            css: {
                src: 'src/css/production.css',
                dest: 'public/css/production.css'
            }
        },
        uglify: {
            js: {
                options: {
                    mangle: false
                },
                src: 'public/js/production.js',
                dest: 'public/js/production.js'
            }
        },
        notify: {
            task_name: {
                options: {
                    // Task-specific options go here.
                }
            },
            watch: {
                options: {
                    title: 'Build Complete',
                    message: 'The build has finished running',
                    duration: 3
                }
            },
            server: {
                options: {
                    title: 'OpenMovie',  // optional
                    message: 'Build is ready!',
                    duration: 3
                }
            }
        },
        manifest: {
            generate: {
                options: {
                    basePath: '',
                    network: ['http://*', 'https://*'],
                    fallback: ['/ /offline.html'],
                    exclude: [''],
                    preferOnline: true,
                    verbose: true,
                    timestamp: true,
                    hash: true
                },
                src: [
                    'public/*.html',
                    'public/js/*.js',
                    'public/css/*.css',
                    'public/img/*.png'
                ],
                dest: 'public/manifest.appcache'
            }
        },
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'server.js',

                    // Setting to `false` will effectively just run `node path/to/server.js`
                    background: true,

                    // Called when the spawned server throws errors
                    fallback: function() {

                    },

                    port: 3004,

                    // Set --debug
                    debug: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['htmlmin:dev', 'concat', 'sass', 'uglify', 'cssmin', 'manifest:generate', 'notify:server']);
    grunt.registerTask('serve', ['express:dev', 'watch']);
    grunt.registerTask('test', []);

};
