/**
 * Cyko - Logger
 *
 * > ---
 *
 * Collection of logging utilites.
 *
 *
 * + Printing to `stdout`
 * + Printing to `stderr`
 *
 * ---
 *
 * @author eggheadedmonkey <cyko@eggheadedmonkey.com>
 */

declare module 'log' {

  /**
   * Get an objective representation of the **package.json** contents.
   *
   * ```ts
   * interface example {
   *   name: string;
   *   version: string;
   *   description: string;
   *   keywords: string[ ... ];
   *   license: string;
   *   author: string | { name: string; email: string; };
   *   config: { ...; };
   *   scripts: { ...; };
   *   dependencies: { ...; };
   *   repository: { type: string; url: string; };
   * };
   * ```
   */

  function package(): object;

  /* ----------------------------------------------------------------------- */

  /**
   * Printable type.
   */

  type output = string | number;

  /**
   * Module configuration ( structure ).
   */

  type configuration = {
    header: {
      prefix: output;
      middle: output | (() => output)
      suffix: output;
    };
    prefix: {
      out: output;
      err: output;
    };
  };

  /**
   * Module configuration ( structure ).
   *

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
  };
  */

  /**
   * Module configuraton ( set | get ).
   *
   * - All properties are optional.
   * - All properties have default values.
   * - All properties (except: head) name a function.
   *
   * > ---
   *
   * Set any number of properties ( see the {@link configuration} structure ).
   * ```js
   * log.config({ property: 'value' });
   * ```
   * Get the current configuration.
   * ```js
   * log.config();
   * ```
   *
   * > ---
   *
   * ```ts
   * // Printable.
   * type output = string | number;
   * // Structure.
   * type configuration = {
   *   header: {
   *     prefix: output;
   *     middle: output | (() => output);
   *     suffix: output;
   *   };
   *   prefix: {
   *     out: output;
   *     err: output;
   *   };
   * };
   * ```
   *
   * @returns `this` or the current {@link configuration}.
   */

  function config(arg?: configuration | null): log | configuration;

  /* ----------------------------------------------------------------------- */

  /**
   * Prints to `stdout`.
   *
   * @param msg Output.
   * @param arg Output ( additional ).
   *
   * @returns `this`
   */

  function out(msg?: any, ...arg: any[]): log;

  /**
   * Prints to `stderr`.
   *
   * @param msg Output.
   * @param arg Output ( additional ).
   *
   * @returns `this`
   */

  function err(msg?: any, ...arg: any[]): log;

  /**
   * Prints newlines ( endings ) to `stdout`.
   *
   * @param num Number lines.
   * @param fun Called twice for each ending ( before and after ).
   * Return `true` to stop execution.
   *
   * @returns `this`
   */

  function end(num?: number, fun?: (
      self: log,
      next: boolean,
      line: number,
      ends: number
    ) => boolean
  ): log;

  /**
   * Prints to `stderr`.
   *
   * Prints a message compiled from the combined arguments, followed by the
   * current stack-trace.
   *
   * ```js
   * log.bug()
   * // > Error: runtime failure!'
   * // >   at function (file:1:1)'
   * // >   at ...'
   * // >   at ...'
   *
   * log.bug('unexpected value:', null)
   * // > Error: unexpected value: null
   * // >   at function (file:1:1)
   * // >   at ...
   * // >   at ...
   * ```
   *
   * @param msg Output.
   * @param arg Output ( additionals ).
   *
   * @returns `this`
   */

  function bug(msg?: output, arg: any[]): log;

};
