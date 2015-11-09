import gulp from 'gulp';

import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

gulp.task('babel', () => {
    gulp.src('src/*.es6')
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('minify', () => {
    gulp.src('src/babel/*.js')
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('lib'));
})

gulp.task('watch', () => {
    gulp.watch('src/*.es6', ['babel', 'minify'])
})

gulp.task('default', ['babel', 'minify', 'watch']);
