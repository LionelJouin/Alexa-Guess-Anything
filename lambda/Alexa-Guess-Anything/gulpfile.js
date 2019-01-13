var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("compile", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('copy_package_json', function () {
    return gulp.src('package.json').pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('compile', 'copy_package_json'));