var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
    notify: false //no notifications in browser
  });

  gulp.watch(['*.html', 'templates/**/*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'public'}, reload);
});