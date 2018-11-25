(function() {
    'use strict';
  
    var globals = typeof window === 'undefined' ? global : window;
    if (typeof globals.require === 'function') return;
  
    var modules = {};
    var cache = {};
    var aliases = {};
    var has = ({}).hasOwnProperty;
  
    var expRe = /^\.\.?(\/|$)/;
    var expand = function(root, name) {
      var results = [], part;
      var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  
    var dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
  
    var localRequire = function(path) {
      return function expanded(name) {
        var absolute = expand(dirname(path), name);
        return globals.require(absolute, path);
      };
    };
  
    var initModule = function(name, definition) {
      var hot = null;
      hot = hmr && hmr.createHot(name);
      var module = {id: name, exports: {}, hot: hot};
      cache[name] = module;
      definition(module.exports, localRequire(name), module);
      return module.exports;
    };
  
    var expandAlias = function(name) {
      return aliases[name] ? expandAlias(aliases[name]) : name;
    };
  
    var _resolve = function(name, dep) {
      return expandAlias(expand(dirname(name), dep));
    };
  
    var require = function(name, loaderPath) {
      if (loaderPath == null) loaderPath = '/';
      var path = expandAlias(name);
  
      if (has.call(cache, path)) return cache[path].exports;
      if (has.call(modules, path)) return initModule(path, modules[path]);
  
      throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
    };
  
    require.alias = function(from, to) {
      aliases[to] = from;
    };
  
    var extRe = /\.[^.\/]+$/;
    var indexRe = /\/index(\.[^\/]+)?$/;
    var addExtensions = function(bundle) {
      if (extRe.test(bundle)) {
        var alias = bundle.replace(extRe, '');
        if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
          aliases[alias] = bundle;
        }
      }
  
      if (indexRe.test(bundle)) {
        var iAlias = bundle.replace(indexRe, '');
        if (!has.call(aliases, iAlias)) {
          aliases[iAlias] = bundle;
        }
      }
    };
  
    require.register = require.define = function(bundle, fn) {
      if (typeof bundle === 'object') {
        for (var key in bundle) {
          if (has.call(bundle, key)) {
            require.register(key, bundle[key]);
          }
        }
      } else {
        modules[bundle] = fn;
        delete cache[bundle];
        addExtensions(bundle);
      }
    };
  
    require.list = function() {
      var list = [];
      for (var item in modules) {
        if (has.call(modules, item)) {
          list.push(item);
        }
      }
      return list;
    };
  
    var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
    require._cache = cache;
    require.hmr = hmr && hmr.wrap;
    require.brunch = true;
    globals.require = require;
  })();
  
  (function() {
  var global = window;
  var process;
  var __makeRelativeRequire = function(require, mappings, pref) {
    var none = {};
    var tryReq = function(name, pref) {
      var val;
      try {
        val = require(pref + '/node_modules/' + name);
        return val;
      } catch (e) {
        if (e.toString().indexOf('Cannot find module') === -1) {
          throw e;
        }
  
        if (pref.indexOf('node_modules') !== -1) {
          var s = pref.split('/');
          var i = s.lastIndexOf('node_modules');
          var newPref = s.slice(0, i).join('/');
          return tryReq(name, newPref);
        }
      }
      return none;
    };
    return function(name) {
      if (name in mappings) name = mappings[name];
      if (!name) return;
      if (name[0] !== '.' && pref) {
        var val = tryReq(name, pref);
        if (val !== none) return val;
      }
      return require(name);
    }
  };
  require.register("initialize.js", function(exports, require, module) {
  'use strict';
  
  var _kohonen = require('kohonen');
  
  var _kohonen2 = _interopRequireDefault(_kohonen);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  console.clear(); /*  brunch watch --server  */
  
  var d3 = require('d3');
  
  var data = d3.range(500).map(function () {
      return [Math.random(), Math.random(), Math.random()];
  });
  
  function color(v) {
      return d3.rgb(v[0]*256, v[1]*256, v[2]*256);
  }
  
  function go() {
  
      var grid = 12,
          width = 960,
          height = 500,
          r = height / grid;
  
      // you can use the grid helper to generate a grid with 10x10 hexagons
      var k = new _kohonen2.default({ data: data, neurons: _kohonen.hexagonHelper.generateGrid(grid, grid), maxStep: 500 });
  
      var svg = d3.select('#app').append('svg').attr('width', width).attr('height', height);
  
      var neurons = svg.append('g').selectAll('circle').data(k.neurons);
  
      neurons = neurons.merge(neurons.enter().append('circle').attr('r', r / 2 + 1).attr('transform', function (d) {
          return 'translate(' + [d.pos[0] * r, d.pos[1] * r] + ')';
      }));
  
      neurons.attr('fill', function (d) {
          return color(d.v);
      }).attr('fill-opacity', 0.1);
  
      svg.data = svg.append('g').selectAll('circle').data(data).enter().append('circle').attr('r', 3.5).attr('stroke', 'white').attr('fill', function (d, i) {
          return color(data[i]);
      }).attr('transform', function (d, i) {
          var a = 2 * Math.PI * Math.random(),
              r = Math.random() * Math.random() * height / 2;
          return 'translate(' + [height / 2 + Math.cos(a) * r, height / 2 + Math.sin(a) * r] + ')';
      });
  
      setTimeout(function () {
          k.training();
  
          neurons.data(k.neurons).transition().duration(4000).attr('fill', function (d) {
              return color(d.v);
          }).attr('fill-opacity', 1);
  
          svg.data.data(k.mapping()).transition().duration(4000).attr('transform', function (d, i) {
              d.pos = [d[0] + 0.3 * Math.cos(i * 45) * Math.sqrt(Math.random()), d[1] + 0.3 * Math.sin(i * 45) * Math.sqrt(Math.random())];
              return 'translate(' + [d.pos[0] * r, d.pos[1] * r] + ')';
          });
      }, 1000);
  }
  
  document.addEventListener('DOMContentLoaded', function () {
      // do your setup here
      // console.clear();
      console.log('Initialized app');
  
      go();
  });
  });
  
  require.alias("buffer/index.js", "buffer");
  require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
    
  });})();require('___globals___');
  
  