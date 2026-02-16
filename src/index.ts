// Inspired on http://www.2ality.com/2015/01/template-strings-html.html#comment-2078932192

import escape from "html-es6cape";
import { endsWithUnescapedAttribute, endsWithUriAttribute } from "./attributes";

function htmlTemplateTag(
  literals: TemplateStringsArray,
  ...substs: Array<string | string[]>
): string {
  return literals.raw.reduce((acc, lit, i) => {
    // If the interpolation is preceded by a dollar sign, substitution is
    // considered safe and will not be escaped.
    const shouldEscape = !literals.raw[i - 1].endsWith("$");

    let subst = substs[i - 1];
    if (Array.isArray(subst)) {
      // For arrays, we just join its items without further escaping, meaning
      // that we trust the items have been already escaped!
      subst = subst.join("");
    } else if (shouldEscape) {
      subst = escape(subst);
    } else {
      // We are not escaping, so we need to remove the leading "$" sign before
      // the interpolation.
      acc = acc.slice(0, -1);
    }

    /**
     * If the interpolation is preceded by an unescaped attribute, we need to
     * add quotes around the substitution to avoid XSS attacks.
     *
     * ```
     * const foo = "Alt onload=alert(1)";
     * html`<img src="..." alt=${foo} />`
     *    => <img src="..." alt=Alt onload=alert(1) />
     * ```
     */
    if (endsWithUnescapedAttribute(acc)) {
      acc += '"';
      lit = '"' + lit;
    }

    /**
     * If the interpolation is preceded by an attribute that takes an URI, we
     * remove the interpolation altogether as it can pose serious security
     * vulnerabilities.
     *
     * A warning is displayed in the console.
     */
    if (endsWithUriAttribute(acc) && shouldEscape) {
      console.warn(
        "[html-template-tag] Trying to interpolate inside an URI attribute. This can lead to security vulnerabilities. The interpolation has been removed. If you are sure you want to interpolate inside an URI attribute, please escape this interpolation with an extra '$' sign in front of it.",
        { acc, subst, lit },
      );

      subst = "";
    }

    return acc + subst + lit;
  });
}

export default htmlTemplateTag;
