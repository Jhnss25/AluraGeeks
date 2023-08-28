const { src, dest, watch, series } = require('gulp');

// css
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');

// Imagenes
const imaemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const opciones = {
    quality: 50
}

function css() {
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (err) {
                console.error('Error', err.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(postcss([ autoprefixer/*, cssnano */]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
}

function imagenes() {    
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));
}

function versionAvif() {
    return src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
}

function versionWebp() {
    return src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.versionWebp = versionWebp;
exports.default = series(imagenes, versionAvif, versionWebp, dev, css, );