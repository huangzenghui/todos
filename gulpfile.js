var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');

if (process.env.NODE_ENV === 'production') {
  gulp.task('build', function() {
    gulp.src('src/server/**/*.js')
      .pipe(babel({
        presets: ['es2015', 'stage-3']
      }))
      .pipe(gulp.dest('./build'))
  });
} else {
  gulp.task('build', function() {
    return watch('src/server/**/*.js', { ignoreInitial: false }, function() {
      gulp.src('src/server/**/*.js')
        .pipe(babel({
          presets: ['es2015', 'stage-3']
        }))
        .pipe(gulp.dest('./build'))
    })
  });
}

gulp.task('default', function() {
  gulp.start('build');
})
