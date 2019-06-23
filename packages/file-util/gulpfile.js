const gulp = require("gulp");

const ts = require("gulp-typescript");
const ts_project = ts.createProject("tsconfig.json");

const dts_bundler = require("dts-bundle");
const del = require("del");

const rename = require("gulp-rename");

gulp.task("compile", () =>
{
    return gulp.src("./src/**/*.ts")
        .pipe(ts_project())
        .js.pipe(gulp.dest("./build"));
});

gulp.task("type-gen", () =>
{
    return gulp.src("./src/**/*.ts")
        .pipe(ts_project())
        .dts.pipe(gulp.dest("./build"));
});

gulp.task("bundle", (done) =>
{
    dts_bundler.bundle({
        name: 'file-util',
        main: './build/index.d.ts'
    });

    done();
});


gulp.task("clean", (done) =>
{
    del(["build/**/*.d.ts", "!build/index.d.ts"]);
    done();
});

gulp.task("rename", () =>
{
    return gulp.src("./build/file-util.d.ts")
        .pipe(rename("index.d.ts"))
        .pipe(gulp.dest("./build"));
});

gulp.task("build", gulp.series("compile", "type-gen", "bundle", "rename", "clean"));