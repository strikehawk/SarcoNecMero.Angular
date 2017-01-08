/// <binding BeforeBuild='build-dev' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    jasmine = require("gulp-jasmine"),
    karma = require("gulp-karma"),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require("del"),
    runSequence = require("run-sequence");

var webRoot = "./dist/";
var appRoot = webRoot + "app/";
var scriptsRoot = "./";
var libsRoot = scriptsRoot + "libs/";
var assetsInputRoot = "./assets/";
var assetsOutputRoot = webRoot + "assets/";
var srcRoot = scriptsRoot + "src/";
var testsRoot = scriptsRoot + "test/unit/";

var paths = {
    webroot: webRoot,
    assets: {
        css: {
            input: [
                srcRoot + "**/*.css"
            ],
            output: assetsOutputRoot + "css/"
        },
        img: {
            input: assetsInputRoot + "img/**/*.*",
            output: assetsOutputRoot + "img/"
        },
        fonts: {
            input: assetsInputRoot + "fonts/*.*",
            output: webRoot + "fonts/"
        }
    },
    sources: {
        tsProject: srcRoot + "tsconfig.json",
        typescript: srcRoot + "**/*.ts",
        html: scriptsRoot + "*.html",
        output: appRoot
    },
    views: {
        source: srcRoot + "**/*.html",
        base: srcRoot,
        output: appRoot
    },
    tests: {
        tsProject: testsRoot + "tsconfig.json",
        typescript: testsRoot + "**/*.ts",
        output: testsRoot
    }
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.index = paths.webroot + "index.html";

gulp.task("clean", function (cb) {
    del(webRoot + "**", cb);
});

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src(paths.assets.css.input)
        .pipe(concat(paths.assets.css.output + "sarconecmero.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("copy", function(cb) {
    gulp.src(paths.views.source, {base: paths.views.base})
        .pipe(gulp.dest(paths.views.output));
    gulp.src(paths.assets.img.input)
        .pipe(gulp.dest(paths.assets.img.output));
    gulp.src(paths.assets.css.input)
        .pipe(concat(paths.assets.css.output + "sarconecmero.css"))
        .pipe(gulp.dest("."));

    cb();
});

gulp.task("copyLibs:openlayers", function(cb) {
    del(libsRoot + "ol3/**", cb);

    gulp.src("./node_modules/openlayers/dist/*.*")
        .pipe(gulp.dest(libsRoot + "ol3"));

    cb();
});

gulp.task("copyLibs:lodash", function(cb) {
    del(libsRoot + "lodash/**", cb);

    gulp.src("./node_modules/lodash/lodash.*")
        .pipe(gulp.dest(libsRoot + "lodash"));

    cb();
});

gulp.task("copyLibs:es6-shim", function(cb) {
    del(libsRoot + "es6-shim/**", cb);

    gulp.src("./node_modules/es6-shim/es6-shim.*")
        .pipe(gulp.dest(libsRoot + "es6-shim"));

    cb();
});

gulp.task("typescript:sources", function (cb) {
    var tsProject = ts.createProject(paths.sources.tsProject);

    var tsResult = gulp.src(paths.sources.typescript)
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.sources.output));

    cb();
});

gulp.task("typescript", ["typescript:sources"]);
gulp.task("min", ["min:css", "min:js", "typescript", "copy"]);

gulp.task("build-dev", function(cb){
    runSequence(["typescript", "copy"]);

    cb();
});

gulp.task("build-prod", ["clean", "typescript", "copy", "min"]);

gulp.task("bower", function () {
    return bower()
           .pipe(gulp.dest("wwwroot/lib/"));
});

