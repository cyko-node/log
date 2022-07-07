/* ---- + ------------------------------------------------------------------- +
 | DEP : MODULES
 + ---- + ---------- */
const nox = require('nox')
/* ---- + ----------
 | VARS : CONFIG
 + ---- + ---------- */
const ccfg = {
  pkg: require('../package.json'),
  usr: require('../config.json'),

  get(k, p) {
    return nox.get(nox.get(nox.get(cfg.usr, k), p))
  }
}

/* ----------------------------------------------------------------------- +
 | CONFIG
 + ------ */


class cfg {
  static pkg = require('../package.json')
  static usr = require('../config.json')
  static def = JSON.parse(JSON.stringify(cfg.usr))

  static get(k, p) {
    return nox.get(nox.get(nox.get(cfg.usr, k), p))
  }

  static set(k, p, v) {
    cfg.usr[k][p] = v
  }
}

console.log(cfg.usr.header)
console.log(cfg.def.header)
cfg.def.header.middle = 1
console.log(cfg.def.header)
console.log(cfg.usr.header)
/* ----------------------------------------------------------------------- +
 | HELP
 + ---- */

class help {

  /**
   * Header compiler.
   */

  static header() {
    return `${(
      cfg.get('header', 'prefix')
    )}${(
      cfg.get('header', 'middle')
    )}${(
      cfg.get('header', 'suffix')
    )}`
  }

  /**
   * String compiler.
   */

  static string(...arg) {
    return nox.string(...arg)
  }

  /**
   * Message compiler.
   */

  static format(self, ...out) {
    return [ help.header(), ...out ]
  }
}


/* ---- + ------------------------------------------------------------------- +
 | CODE : EXPORTS
 + ---- */

// -------------------------------------------------------------------------- +

const imp = {
  out: console.debug,
  err: console.error,
  bug: console.error,
  end: console.debug,
}

// -------------------------------------------------------------------------- +

const package = function() {
  return cfg.pkg
}

const config = function(arg = null) {
  if (arg != null) {
    if (has(arg, 'header')) {
      for (const key in cfg.usr.header) {
        cfg.usr.header[key] = nox.get(arg.header, key, cfg.usr.header)
      }
    }
    if (has(arg, 'prefix')) {
      for (const key in cfg.usr.prefix) {
        cfg.usr.prefix[key] = nox.get(arg.prefix, key, cfg.usr.prefix)
      }
    }
    return this
  } else {
    return cfg.usr
  }
}

// -------------------------------------------------------------------------- +

const out = function(...arg) {
  imp.out(...help.format(this, cfg.usr.prefix.out, ...arg))
  return this
}

const err = function(...arg) {
  imp.err(...help.format(this, cfg.usr.prefix.err, ...arg))
  return this
}

const bug = function(msg = '...', ...arg) {
  imp.bug(new Error(help.string(msg, ...arg)))
  return this
}

const end = function(
  num = 1,
  fun = (self, next, line, ends) => { return false }
) {
  for (let x = 0; x < num; x++) {
    if (fun(this, false, (x + 1), num)) { break }
    imp.end()
    if (fun(this, true,  (x + 1), num)) { break }
  }
  return this
}
// -------------------------------------------------------------------------- +

module.exports = {
  package,
  config,

  out,
  err,
  bug,
  end,

  imp,
}
