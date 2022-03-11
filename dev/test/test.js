const log = require('log')
const pkg = log.package()
const num = process.argv.includes('test', 2)
  ? Number(process.argv.at(3))
  : false

if (num) {
  const out = console.debug
  const err = console.error

  switch (num) {
    case 1||2||3||4||5||6||7||8||9: {
      out(`@ ${pkg.name}:test[${num}]`, '...')
      out()

      log.config({
        prefix: {
          out: '>>',
          err: '!!'
        }
      })
      log.out(1)
      log.out(1, 2, 'bgfggh')
      log.config({
        header: {
          middle() { return '%' },
          prefix: '<',
          suffix: '>'
        }
      })
      log.err('gfgg', 2)
      log.end()
      log.out('byfgy')
      log.end(4, (self, next, line, ends) => {
        return line == 2 && next
      })
      log.out('---')
      log.bug()
      log.out('---')
      log.err(123455)

      out()
      out(`@ ${pkg.name}:test[${num}] done.`)
    } break

    default: {
      err(`@ ${pkg.name}:test[${num}] unknown!`)
    }
  }
}
