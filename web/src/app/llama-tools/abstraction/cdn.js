(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('underscore', factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (function () {
    var current = global._;
    var exports = global._ = factory();
    exports.noConflict = function () { global._ = current; return exports; };
  }()));
}(this, (function () {
  // Core function to create the wrapper object
  function _$1(obj) {
    if (obj instanceof _$1) return obj;
    if (!(this instanceof _$1)) return new _$1(obj);
    this._wrapped = obj;
  }

  var allExports = {
    __proto__: null,
    VERSION: '0.0.0',
    fivehundred_notebooks: function( ) {

        // all lamas want to use llama to write living notebooks
    },
    img_to_threejs: function () {
      async function magic_iframe(req: Request) {
        const url = new URL(req.url);
        const proxy_url = url.searchParams.get('url')
        console.log('proxy_url', proxy_url)
      
      const response = await fetch(proxy_url);
      const html = await response.text()
      
      
      return new Response(html, {
          headers: { 'Content-Type': 'text/html' }
        });
      }

    },

    magic_video_tag: function (youtube_link) {
      return `<iframe width="900px" height="500px" frameborder="0" src="${youtube_link}"></iframe>`
    },

    magic_llama: function (msg, cb) {
      return fetch("https://hashirama.blog/api/magic_llama?msg=" + msg)
        .then(r => r.json())
        .then(data => cb(data));


// --- dont have to learn any app - just press tab and --- itl automcplete --- suggest actions -- open soruce 


    },
    magic_iframe: function (src, opts) {
      opts = opts || {}
      opts.width = opts.width || "900px"
      opts.height = opts.height || "500px"
      opts.frameborder = opts.frameborder || "0"
      return `<iframe width="${opts.width}" height="${opts.height}" frameborder="${opts.frameborder}" src="${src}"></iframe>`

    },
    magic_canvas: function () {
        //deno webgl - takes any script - 
    },
    bun_cell: function () {

    },
    'default': _$1
  };

  // Default Export

  // Add all of the Underscore functions to the wrapper object.
  var _ = allExports;
  // Legacy Node.js API.
  _._ = _;

  return _;

})));
//# sourceMappingURL=underscore-umd.js.map