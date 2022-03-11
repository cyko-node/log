/* ---- + ------------------------------------------------------------------- +
 | DEPS : MODULES
 + ---- + ---------- */
const nox = require('nox')
/* ---- + ----------
 | VARS : CONFIG
 + ---- + ---------- */
const cfg = {
  pkg: require('../package.json'),
  def: require('../config.json'),
  usr: require('../config.json')
};{
  ops = {
    pkg: {
      o: cfg, attributes: {
        configurable: false,
        enumerable: true,
        writable: false,
      }
    },
    def: {
      o: cfg, attributes: {
        configurable: false,
        enumerable: true,
        writable: false,
      }
    },
    usr: {
      o: cfg, attributes: {
        configurable: false,
        enumerable: true,
        writable: true,
      }
    }
  }

  for (const p in ops) {
    Object.defineProperty(ops[p].o, p, ops[p].attributes)
  }
}

/* ---- + ------------------------------------------------------------------- +
 | CODE : HELP
 + ---- */

/**
 * Combines the `header` configuration into a `string`.
 *
 * @param {object} obj Configuration object.
 * @param {*}      obj.prefix
 * @param {*|()*}  obj.middle
 * @param {*}      obj.suffix
 */

function header(obj) {
  return `${obj.prefix}${(typeof obj.middle === 'function'
    ? obj.middle()
    : obj.middle
  )}${obj.suffix}`
}

/**
 * Global string compiler.
 *
 * @param {*[]} arg Values.
 */

function string(...arg) {
  return nox.to.string(...arg)
}

/**
 * Global message compiler.
 *
 * ```js
 * return [ header(...), ...out ]
 * ```
 *
 * @param {log} mod `this`
 * @param {*[]} out `*` | `[ ... ]`
 */

function format(mod, ...out) {
  return [ header(cfg.usr.header), ...out ]
}

/* ---- + ------------------------------------------------------------------- +
 | CODE : EXPORTS
 + ---- */

exports.package = function() {
  return cfg.pkg
}

exports.config = function(arg = null) {
  if (arg != null) {
    // header properties
    if (nox.has(arg, 'header')) {
      cfg.usr.header.prefix =
        nox.get(arg.header, 'prefix', cfg.def.header.prefix)
      cfg.usr.header.middle =
        nox.get(arg.header, 'middle', cfg.def.header.middle)
      cfg.usr.header.suffix =
        nox.get(arg.header, 'suffix', cfg.def.header.suffix)
    }

    // prefix properties
    if (nox.has(arg, 'prefix')) {
      cfg.usr.prefix.out =
        nox.get(arg.prefix, 'out', cfg.def.prefix.out)
      cfg.usr.prefix.err =
        nox.get(arg.prefix, 'err', cfg.def.prefix.err)
    }

    return this
  } else {
    return cfg.usr
  }
}

/* ------------------------------------------------------------------------- */

exports.out = function(msg, ...arg) {
  console.debug(...format(this, cfg.usr.prefix.out, msg, ...arg))
  return this
}

exports.err = function(msg, ...arg) {
  console.error(...format(this, cfg.usr.prefix.err, msg, ...arg))
  return this
}

exports.end = function(
  num = 1,
  fun = (self, next, line, ends) => { return false }
) {
  for (let x = 0; x < num; x++) {
    if (fun(this, false, (x + 1), num)) { break }
    console.debug()
    if (fun(this, true,  (x + 1), num)) { break }
  }
  return this
}

exports.bug = function(msg = '...', ...arg) {
  console.error(new Error(string(msg, ...arg)))
  return this
}

/* ------------------------------------------------------------------------- */
