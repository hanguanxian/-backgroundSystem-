var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var argv = require('yargs').argv;
var through2 = require('through2');
var rev = require('gulp-rev');
var revCollector = require("gulp-rev-collector");
var gulpSync = require("gulp-sync")(gulp);
var clean = require('gulp-clean');

var environment = argv.p || "";
if (environment == "master") {
  config = config.config_master;
} else if (environment == "release") {
  config = config.config_release;
} else if (environment == "product") {
  config = config.config_product;
} else {
  config = config.config_master;
}



//删除之前旧文件
gulp.task("clean", function() {
  return gulp.src(config.dist_base)
    .pipe(clean());
})


// 检查脚本
gulp.task('lint', function() {
  gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// 模块化js文件
gulp.task('browserify', function() {
  if (environment == "product") {
    return gulp.src('js/pages/**/*.js')
      .pipe(through2.obj(function(file, enc, next) {
        browserify(file.path)
          .bundle(function(err, res) {
            err && console.log(err.stack);
            file.contents = res;
            next(null, file);
          });
      }))
      .pipe(uglify()) // uglify
      //.pipe(sourcemaps.init({loadMaps: true}))
      //.pipe(sourcemaps.write("."))
      .pipe(rev())
      .pipe(gulp.dest(config.dist_js))
      .pipe(rev.manifest())
      .pipe(gulp.dest(config.dist_rev + "/js"))
      .pipe(connect.reload());
  } else {
    return gulp.src('js/pages/**/*.js')
      .pipe(through2.obj(function(file, enc, next) {
        browserify(file.path)
          .bundle(function(err, res) {
            err && console.log(err.stack);
            file.contents = res;
            next(null, file);
          });
      }))
      //.pipe(uglify()) // uglify
      //.pipe(sourcemaps.init({loadMaps: true}))
      //.pipe(sourcemaps.write("."))
      .pipe(rev())
      .pipe(gulp.dest(config.dist_js))
      .pipe(rev.manifest())
      .pipe(gulp.dest(config.dist_rev + "/js"))
      .pipe(connect.reload());
  }

});

//压缩合并less
gulp.task('less', function() {
  gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(gulp.dest(config.dist_css))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.dist_rev + "/less"));
});

//压缩合并css
gulp.task('css', function() {
  return gulp.src('css/**/*.css')
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(gulp.dest(config.dist_css))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.dist_rev + "/css"));
});

//复制粘贴
gulp.task('copy', function() {
  return gulp.src(['html/**/*.html', 'index.html'])
    .pipe(gulp.dest(config.dist_html))
    .pipe(connect.reload());
});

//图片压缩
gulp.task('images', function() {
  return gulp.src('img/**/*.{jpg,png,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist_img));
});

//版本控制 替换html引用js及css文件
gulp.task('rev', function() {
  return gulp.src([config.dist_rev + "/**/*.json", config.dist_html + "/**/*.html"])
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(gulp.dest(config.dist_html));
});

//打印任务
gulp.task('printSuc', function() {
  console.log('******************打包完成********************');
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', function() {
    gulp.run('buildJs');
    //gulpSync.sync([['lint','browserify'],'rev']);
    console.log('**********watch任务触发：重新编译js文件**********');
  });

  gulp.watch('css/**/*.css', function() {
    gulp.run('buildCss');
    console.log('**********watch任务触发：重新编译css文件**********');
  });

  gulp.watch('less/**/*.less', function() {
    gulp.run('buildLess');
    console.log('**********watch任务触发：重新编译less文件**********');
  });

  gulp.watch('html/**/*.html', function() {
    gulp.run('buildHtml');
    console.log('**********watch任务触发：复制html文件**********');
  });

  gulp.watch('*.html', function() {
    gulp.run('buildHtml');
    console.log('**********watch任务触发：复制html文件**********');
  });

  gulp.watch('img/**/*.{jpg,png,gif}', function() {
    gulp.run('images');
    console.log('**********watch任务触发：重新压缩图片文件**********');
  });

});

gulp.task('buildJs', gulpSync.sync([
  ['lint', 'browserify'], 'rev'
]));
gulp.task('buildCss', gulpSync.sync([
  ['css'], 'rev'
]));
gulp.task('buildLess', gulpSync.sync([
  ['less'], 'rev', 'rev'
]));
gulp.task('buildHtml', gulpSync.sync([
  ['copy'], 'rev'
]));

gulp.task('build', gulpSync.sync(['clean', ['lint', 'css', 'less', 'browserify', 'images', 'copy', 'watch'], 'rev', 'printSuc']));
