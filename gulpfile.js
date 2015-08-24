var gulp             = require('gulp'),
    uglify           = require('gulp-uglify'),
    source           = require('vinyl-source-stream'),
    browserify       = require('browserify'),
    reactify         = require('reactify'),
    streamify        = require('gulp-streamify'),
    less             = require('gulp-less'),
    CleanCssPlugin   = require('less-plugin-clean-css'),
    AutoprefixPlugin = require('less-plugin-autoprefix'),
    Path             = require('path'),
    cleancss         = new CleanCssPlugin({ advanced: true }),
    autoprefix       = new AutoprefixPlugin({ browsers: ['last 2 versions'] }),
    rename           = require('gulp-rename'),
    watch            = require('gulp-watch'),
    clean            = require('gulp-clean'),
    runSequence      = require('run-sequence'),
    path             = {};

path.LESS         = './src/**/*.less';
path.LESS_ENTRY   = './src/components/common/main.less';
path.JS           = './src/**/*.js';
path.A_JS         = './src/analytics.js'
path.JS_ENTRY     = './src/index.js';
path.DIST         = './extension/dist';
path.OUT_CSS      = 'bundle.css';
path.OUT_JS       = 'bundle.js';
path.OUT_A_JS     = 'analytics.js';
path.OUT_A_JS_MIN = 'analytics.min.js';
path.OUT_CSS_MIN  = 'bundle.min.css';
path.OUT_JS_MIN   = 'bundle.min.js';

// LESS
gulp.task('less', function () {
  return gulp.src(path.LESS_ENTRY)
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(rename(path.OUT_CSS_MIN))
    .pipe(gulp.dest(path.DIST));
});

// Watch changes to JS
gulp.task('js', function() {
  return browserify(path.JS_ENTRY)
    .transform(reactify)
    .bundle()
    .pipe(source(path.OUT_JS))
    .pipe(gulp.dest(path.DIST))
    .pipe(rename(path.OUT_JS_MIN))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DIST));
});

// Watch CSS
gulp.task('watchLess', function () {
  gulp.watch(path.LESS, ['less']);
});

// Watch JS
gulp.task('watchJs', function () {
  gulp.watch(path.JS, ['js']);
});

// Tracking JS
gulp.task('trackingJs', function () {
  return browserify(path.A_JS)
    .bundle()
    .pipe(source(path.OUT_A_JS))
    .pipe(gulp.dest(path.DIST))
    .pipe(rename(path.OUT_A_JS_MIN))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DIST));
})

// Clean DIST
gulp.task('clean', function () {
  return gulp.src(path.DIST, {read: false})
    .pipe(clean());
});

// Clean Non-Minified Files
gulp.task('cleanNonMinifiedJs', function () {
  return gulp.src(Path.join(path.DIST, path.OUT_JS), {read: false})
    .pipe(clean());
});

gulp.task('cleanNonMinifiedTrackingJs', function () {
  return gulp.src(Path.join(path.DIST, path.OUT_A_JS), {read: false})
    .pipe(clean());
});

gulp.task('cleanNonMinifiedCss', function () {
  return gulp.src(Path.join(path.DIST, path.OUT_CSS), {read: false})
    .pipe(clean());
});

gulp.task('release', function () {
  runSequence('clean',
             ['less', 'js', 'trackingJs'],
             ['cleanNonMinifiedJs', 'cleanNonMinifiedTrackingJs', 'cleanNonMinifiedCss']);
});

gulp.task('default', ['less', 'js', 'watchLess', 'watchJs']);