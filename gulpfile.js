var gulp         = require( 'gulp'              );
var plumber      = require( 'gulp-plumber'      );
var rename       = require( 'gulp-rename'       );
var autoprefixer = require( 'gulp-autoprefixer' );
var concat       = require( 'gulp-concat'       );
var uglify       = require( 'gulp-uglify'       );
var imagemin     = require( 'gulp-imagemin'     );
var cache        = require( 'gulp-cache'        );
var minifycss    = require( 'gulp-minify-css'   );
var sass         = require( 'gulp-sass'         );
var browserSync  = require( 'browser-sync'      );

gulp.task( 'browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./public/"
        }
    });
});

gulp.task( 'bs-reload', function () {
    browserSync.reload();
});

gulp.task( 'images', function() {
    gulp.src( 'src/images/**/*' )
        .pipe( 
            cache( 
                imagemin({ 
                    optimizationLevel: 3, 
                    progressive: true, 
                    interlaced: true 
                })
            )
        )
        .pipe( gulp.dest( 'public/images/' ) );
});

gulp.task( 'styles', function() {
    gulp.src([ 'src/sass/app.scss' ])
        .pipe( 
            plumber({
                errorHandler: function( error ) {
                    console.log( error.message );
                    this.emit( 'end' );
                }
            })
        )
        .pipe( sass() )
        .pipe( autoprefixer( 'last 2 versions' ) )
        .pipe( gulp.dest( 'public/styles/' ) )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( minifycss() )
        .pipe( gulp.dest( 'public/styles/' ) )
        .pipe( browserSync.reload({ stream: true }) )
});

gulp.task( 'scripts', function() {
    return gulp.src( 'src/js/**/*.js' )
        .pipe(
            plumber({
                errorHandler: function( error ) {
                    console.log( error.message );
                    this.emit( 'end' );
                }
            })
        )
        .pipe( concat( 'main.js' ) )
        .pipe( gulp.dest( 'public/scripts/' ) )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( uglify() )
        .pipe( gulp.dest( 'public/scripts/' ) )
        .pipe( browserSync.reload({ stream: true }) )
});

gulp.task( 'default', ['browser-sync'], function() {
    gulp.watch( "src/sass/**/*.scss", ['styles']    );
    gulp.watch( "src/js/**/*.js",     ['scripts']   );
    gulp.watch( "*.html",             ['bs-reload'] );
});