import gulp from 'gulp';

import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import pump from 'pump';

gulp.task('babel', (cb) => {
    pump([
        gulp.src('src/*.es6'),
        babel(),
        gulp.dest('lib')
    ], cb);
});

gulp.task('minify', (cb) => {
    pump([
        gulp.src('lib/*.js'),
        concat('app.js'),
        uglify({ 
            mangle: false, 
        }),
        gulp.dest('lib')
    ], cb);
});

gulp.task('watch', () => {
    gulp.watch('src/*.es6', ['babel', 'minify'])
});

gulp.task('default', ['babel', 'minify', 'watch']);
