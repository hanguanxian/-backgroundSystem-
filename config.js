var config_master = {
  dist_base: "dist_master/*",
  dist_js: "dist_master/js",
  dist_css: "dist_master/css",
  dist_html: "dist_master/html",
  dist_img: "dist_master/img",
  dist_rev: "dist_master/rev"
};

var config_release = {
  dist_base: "dist_release/*",
  dist_js: "dist_release/js",
  dist_css: "dist_release/css",
  dist_html: "dist_release/html",
  dist_img: "dist_release/img",
  dist_rev: "dist_release/rev"
};

var config_product = {
  dist_base: "dist/*",
  dist_js: "dist/js",
  dist_css: "dist/css",
  dist_html: "dist/html",
  dist_img: "dist/img",
  dist_rev: "dist/rev"
};



module.exports = {
  config_master: config_master,
  config_release: config_release,
  config_product: config_product,
  js_src: 'js/*.js',
  css_src: 'css/**/*.css',
  html_src: 'html/**/*.html',
  img_src: 'img/**/*.{jpg,png,gif}',
  js_brower_src: 'js/pages/**/*.js'
}
