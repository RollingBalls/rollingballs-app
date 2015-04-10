var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var fs          = require('fs');
var path        = require('path');
var del         = require('del');
var glob        = require('glob');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var watchify    = require('watchify');
var envify      = require('envify/custom');
var babelify    = require("babelify");
var deps        = require("gulp-sync")(gulp);
var spritesmith = require('gulp.spritesmith');
var lodash      = require('lodash');
var imageResize = require('gulp-image-resize');
var extractor   = require('gulp-extract-sourcemap');
var vinylBuffer = require('vinyl-buffer');

var plumbError = function() {
  return $.plumber({ errorHandler: $.notify.onError() });
};

var buildScripts = function(watch, environment) {
  var envFile = ".env." + environment + ".json";
  var config = JSON.parse(fs.readFileSync(envFile));
  config["NODE_ENV"] = environment;

  var bundler = browserify({
      debug: watch,
      cache: {},
      packageCache: {},
      fullPaths: watch,
      extensions: [".js", ".jsx"]
    })
    .transform(babelify.configure({
      only: /app/
    }))
    .require('./app/main.js', { entry: true })
    .transform(envify(config));

  if (!watch) {
    bundler = bundler.transform('uglifyify');
  }

  if (watch) {
    bundler = watchify(bundler);
    bundler = bundler
    .on('update', function (time) {
      $.util.log('Updated scripts!');
    })
    .on('log', function (msg) {
      $.util.log(msg);
    });
  }

  var rebundle = function() {
    gulp.src('vendor/scripts/**/*.js').pipe(gulp.dest('dist/scripts/'));

    var rebundler = bundler
      .bundle()
      .on('error', $.notify.onError());

    return rebundler
      .pipe(source('app.js'))
      .pipe(vinylBuffer())
      .pipe(extractor({ basedir: __dirname }))
      .pipe(gulp.dest('dist/scripts'));
  }

  if (watch) {
    bundler.on('update', rebundle);
  }

  return rebundle();
};

gulp.task('styles', function() {
  return gulp.src('assets/styles/main.sass')
    .pipe(plumbError())
    .pipe($.template({
      globImport: function(dir) {
        return glob.sync(path.join("assets", "styles", dir), { nodir: true }).map(function(file) {
          return "@import '" + file.replace('assets/styles/', '') + "'";
        }).join('\n');
      }
    }))
    .pipe($.sass({
      includePaths: ['assets/bower_components'],
      indentedSyntax: true
    }))
    .pipe($.autoprefixer({
      browsers: 'last 2 version',
      cascade: false
    }))
    .pipe(gulp.dest('dist/assets/styles'))
    .pipe($.size());
});

gulp.task('scripts', function() {
  return buildScripts(false, "production");
});

gulp.task('devScripts', function() {
  return buildScripts(false, "development");
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(plumbError())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('fonts', function() {
  return gulp.src('assets/fonts/**/*')
    .pipe(plumbError())
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe($.size());
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(plumbError())
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size());
});

gulp.task('sprites', function(cb) {
  gulp.src('assets/images/sprites/*.png')
    .pipe(plumbError())
    .pipe(spritesmith({
      imgName: 'images/sprites-2x.png',
      cssName: 'styles/variables/_sprites.scss'
    }))
    .pipe(gulp.dest('assets'))
    .on('end', function() {
      gulp.src('assets/images/sprites/*.png')
        .pipe(imageResize({ width: "50%" }))
        .pipe(gulp.dest('temp/sprites'))
        .on('end', function() {
          gulp.src('temp/sprites/*.png')
          .pipe(spritesmith({
            imgName: 'images/sprites-1x.png',
            cssName: 'styles/variables/_sprites.scss',
            cssTemplate: function(context) {
              var template = lodash.template(fs.readFileSync('.sprites-template', 'utf8'));
              return template(context);
            }
          }))
          .pipe(gulp.dest('assets'))
          .on('end', function() {
            del('temp', cb);
          });
        });
    });
});

gulp.task('static', function() {
  return gulp.src('public/**/*')
    .pipe(plumbError())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('iconfont', function(){
  return gulp.src('assets/fonts/svg/*.svg')
    .pipe(plumbError())
    .pipe($.iconfont({
      fontName: 'icons',
      appendCodepoints: false
    }))
    .on('codepoints', function(codepoints) {
      gulp.src('.icon-glyphs-template')
      .pipe(plumbError())
      .pipe($.template({ glyphs: codepoints }))
      .pipe($.rename("_icon-glyphs.scss"))
      .pipe(gulp.dest('assets/styles/variables'));
    })
    .pipe(gulp.dest('assets/fonts'));
});

gulp.task('clean', function(cb) {
  del('dist/**/*', cb);
});

gulp.task('serve', function() {
  return gulp.src('dist')
    .pipe($.webserver({
      livereload: (process.env.NODE_ENV != 'production'),
      port: process.env.PORT || 8000,
      host: '0.0.0.0',
      fallback: 'index.html'
    }));
});

gulp.task('dev', deps.sync(['devBuild', 'serve']), function() {
  gulp.watch('index.html', ['html']);
  gulp.watch('assets/styles/**/*', ['styles']);
  gulp.watch('assets/fonts/**/*', ['fonts']);
  gulp.watch('assets/images/**/*', ['images']);
  gulp.watch('public/**/*', ['static']);

  return buildScripts(true, "development");
});

gulp.task(
  'devBuild',
  deps.sync([
    'clean',
    ['iconfont', 'sprites'],
    ['html', 'styles', 'fonts', 'static', 'images', 'devScripts']
  ])
);

gulp.task(
  'build',
  deps.sync([
    'clean',
    ['iconfont', 'sprites'],
    ['html', 'styles', 'fonts', 'static', 'images', 'scripts']
  ])
);

gulp.task('default', ['dev']);
