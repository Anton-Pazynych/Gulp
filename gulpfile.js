const gulp = require('gulp')
const del = require('del')
const dest = require('dest')
const sass = require('gulp-sass')(require('sass'))
const browsersync = require('browser-sync').create()
const fileinclude = require('gulp-file-include')


// 1 const imagemin = require('gulp-imagemin')


const paths = {
  styles: {
    src: 'src/styles/style.scss',
    allsrc: 'src/styles/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js/'    
  },
  html: {
    src: 'src/*.html',
    allsrc: 'src/**/*.html',
    dest: 'dist/'
  },
  img: {
    src: 'src/img/*',
    dest: 'dist/img/'
  },
}


function clean() {
  return del(['dist/*'])
}

function html() {
  return gulp.src(paths.html.src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream())
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest)) 
    .pipe(browsersync.stream())  
}

function scripts() {
  return gulp.src(paths.scripts.src,)
    .pipe(gulp.dest(paths.scripts.dest)) 
    .pipe(browsersync.stream())
}


function img() {
  return gulp.src(paths.img.src)
    // .pipe(imagemin())
    .pipe(gulp.dest(paths.img.dest))
}



function watch() {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    }
  }) 

  gulp.watch(paths.html.allsrc).on('change', browsersync.reload)
  gulp.watch(paths.html.allsrc, html)
  gulp.watch(paths.styles.allsrc, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.img.src, img)
}


const build = gulp.series(clean, gulp.parallel(styles, scripts, html, img), watch)

exports.clean = clean
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.img = img
exports.watch = watch
exports.build = build
exports.default = build