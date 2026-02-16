import { htmlElementAttributes } from "html-element-attributes";

export const attributes = Object.values(htmlElementAttributes).flat();

export function endsWithUnescapedAttribute(acc: string): boolean {
  return attributes.some((attribute) => acc.endsWith(`${attribute}=`));
}

export const attributesUri = [
  "action",
  "archive",
  "background",
  "cite",
  "classid",
  "codebase",
  "content",
  "data",
  "dynsrc",
  "formaction",
  "href",
  "icon",
  "imagesrcset",
  "longdesc",
  "lowsrc",
  "manifest",
  "nohref",
  "onload",
  "poster",
  "popovertargetaction",
  "profile",
  "src",
  "srcset",
  "style",
  "usemap",
];

export const endsWithUriAttribute = function endsWithAttributes(
  acc: string,
): boolean {
  return attributesUri.some(
    (attribute) =>
      acc.endsWith(`${attribute}=`) || acc.endsWith(`${attribute}="`),
  );
};
