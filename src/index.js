// Inspired on http://www.2ality.com/2015/01/template-strings-html.html#comment-2078932192

import htmlEscape from "html-es6cape";

export default (literals, ...substs) => {
	return literals.raw.reduce((acc, lit, i) => {
		var subst = substs[i - 1];
		
		subst = htmlEscape(subst);

		return acc + subst + lit;
	});
};
