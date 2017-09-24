// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('scss/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest("css"))
});

// Our default gulp task first runs the sass task once when it starts up.
gulp.task('default', ['sass'], function() {
    gulp.watch('scss/**/*.scss', ['sass']);
})
