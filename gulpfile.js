const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const livereload = require('gulp-livereload');

const paths = {
    html : {
        src : 'index.html'
    },
    style : {
        src : 'src/style/*.scss',
        dest : 'assets/style/'
    },
    script : {
        src : 'src/js/*.js',
        dest : 'assets/scripts/'
    }
};

// function connect(){
//     return connect.server({
//         livereload : true
//     })
// }

// function html(){
//     return gulp.src(paths.html.src)
//         .pipe(livereload());
// }

function style() {
    return gulp.src(paths.style.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.style.dest));
}

function script(){
    return gulp.src(paths.script.src)
        .pipe(livereload())
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(gulp.dest(paths.script.dest));
}

function watch() {
    // gulp.watch(paths.html.src, html);
    gulp.watch(paths.script.src, script);
    gulp.watch(paths.style.src, style);
}

const build = gulp.series(gulp.parallel(style,script));

exports.default = build;
exports.watch = watch;