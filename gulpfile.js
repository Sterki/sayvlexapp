const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

function stylesCss() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(
      autoprefixer({
        overrideBrowserlist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("src/css"));
}
function watchFiles() {
  gulp.watch("src/scss/*.scss", stylesCss);
}

gulp.task("watch", gulp.parallel(watchFiles));
