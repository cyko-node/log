/**
 * **Cyko** `log` Collection of logging utilities.
 *
 * @author eggheadedmonkey <cyko@eggheadedmonkey.com>
 */

declare module 'log' {

  /**
   * Printable type.
   */

  type output = string | number;

  /**
   * Module configuration ( structure ).
   */

  interface configuration {
    header: {
      prefix: output;
      middle: output | (() => output)
      suffix: output;
    };
    prefix: {
      out: output;
      err: output;
    };
  }

  interface imp {
    out(...arg: any[]): void;
    err(...arg: any[]): void;
    end(...arg: any[]): void;
    bug(...arg: any[]): void;
  }

  interface log {
    imp: imp

    /**
     * Get an objective representation of the **package.json** contents.
     */

    package(): object;

    /**
     * Module configuraton ( set / get ).
     *
     * + All properties are optional
     * + All properties have default values
     *
     * ```js
     * // Set/configure
     * log.config({ property: 'value' });
     * // Get configuration
     * .
     * log.config();
     * ```
     *
     * @returns **this** or the current **{@link configuration}**.
     */

    config(cfg: configuration): log | configuration;

    /**
     * Prints to `stdout`.
     *
     * @param msg Output.
     * @param arg Output ( optional / additional ).
     */

    out(msg:  any, ...arg: any[]): log;

    /**
     * Prints to `stderr`.
     *
     * @param msg Output.
     * @param arg Output ( optional / additional ).
     */

    err(msg:  any, ...arg: any[]): log;

    /**
     * Prints to `stderr` ( including current stack-trace ).
     *
     * ```js
     * log.bug()
     * // > Error: ...
     * // >   at function (path/file:1:1)
     * // >   at ...
     * // >   at ...
     *
     * log.bug('unexpected value:', null)
     * // > Error: unexpected value: null
     * // >   at function (path/file:1:1)
     * // >   at ...
     * // >   at ...
     * ```
     *
     * @param msg Output.
     * @param arg Output ( additionals ).
     */

    bug(...msg: any[]): log;

    /**
     * Prints a line without the message part to `stdout`.
     *
     * @param lines Number of lines.
     */

    end(lines?: number, call: (
      self: log,
      next: boolean,
      line: number,
      ends: number) => boolean
    ): log;
  }

  /**
   * **Cyko** `log` Collection of logging utilities.
   *
   * + Printing to `stdout`
   * + Printing to `stderr`
   *
   * @author eggheadedmonkey <cyko@eggheadedmonkey.com>
   */

  const log: log; export = log;
}
