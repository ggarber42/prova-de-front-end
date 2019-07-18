const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const paths = {
    style : {
        src : 'src/style/*.scss',
        dest : 'assets/style/'
    },
    script : {
        src : 'src/js/*.js',
        dest : 'assets/scripts/'
    }
};

function style() {
    return gulp.src(paths.style.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.style.dest));
}

function script(){
    return gulp.src(paths.script.src)
        .pipe(babel())
        .pipe(gulp.dest(paths.script.dest));
}

function watch() {
    gulp.watch(paths.script.src, script);
    gulp.watch(paths.style.src, style);
}

const build = gulp.series(gulp.parallel(style,script));

exports.default = build;
exports.watch = watch;