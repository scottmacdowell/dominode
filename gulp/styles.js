'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var replace = require('gulp-replace');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {
  var lessOptions = {
    options: [
      'bower_components',
      path.join(conf.paths.src, '/app')
    ]
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/styles/**/*.less'),
    path.join(conf.paths.src, '/app/**/*.less'),
    path.join(conf.paths.tmp, '/bower_styles/**/*.less'),
    path.join('!' + conf.paths.src, '/app/index.less')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  gulp.src(path.join(conf.paths.bower, '/**/*.less'))
    .pipe(replace('../assets/images', 'assets/images'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/bower_styles/')));

  gulp.src(path.join(conf.paths.bower, '/**/*.{png,jpg,jpeg,bmp}'))
    .pipe($.flatten())
    .pipe(gulp.dest(conf.paths.tmp + '/serve/app/assets/images/'));

  return gulp.src([
    path.join(conf.paths.src, '/app/index.less')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('replaceURL', function (){
  return gulp.src(path.join(conf.paths.bower, '/**/*.less'))
    .pipe(replace('../assets/images', 'assets/images'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/bower_styles/')));
});

gulp.task('serverImages', function (){
  return gulp.src(path.join(conf.paths.bower, '/**/*.{png,jpg,jpeg,bmp}'))
    .pipe($.flatten())
    .pipe(gulp.dest(conf.paths.tmp + '/serve/app/assets/images/'));
});
