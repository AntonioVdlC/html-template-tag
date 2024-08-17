import { describe, it, expect, vi, beforeEach } from "vitest";

import html from "../src";
import { attributes, attributesUri } from "../src/attributes";

const attributesNoUri = attributes.filter(
  (attribute) => !attributesUri.includes(attribute)
);

describe("html-template-tag", () => {
  const consoleWarnSpy = vi
    .spyOn(console, "warn")
    .mockImplementation(() => undefined);

  beforeEach(() => {
    consoleWarnSpy.mockReset();
  });

  it("should return a string when passed a string literal", () => {
    expect(typeof html`Hello, world!`).toEqual("string");
  });

  it("should preserve the string literal value", () => {
    expect(html`Hello, world!`).toEqual("Hello, world!");
  });

  it("should interpolate variables", () => {
    const name = "Antonio";
    expect(html`Hello, ${name}!`).toEqual("Hello, Antonio!");
  });

  it("should escape HTML special characters", () => {
    const chars: Record<string, string> = {
      "&": "&amp;",
      ">": "&gt;",
      "<": "&lt;",
      '"': "&quot;",
      "'": "&#39;",
      "`": "&#96;",
    };

    Object.keys(chars).forEach((key) => {
      expect(html`${key}`).toEqual(chars[key]);
    });
  });

  it("should skip escaping HTML special characters for substituitions with double $", () => {
    const safeString = "<strong>Antonio</strong>";
    expect(html`Hello, $${safeString}!`).toEqual(
      "Hello, <strong>Antonio</strong>!"
    );
  });

  it("should escape HTML special characters if previous substituition ended with $", () => {
    const insertedDollar = "I :heart: $";
    const unsafeString = " & €";
    const emptyString = "";
    expect(html`${insertedDollar}${unsafeString}!`).toEqual(
      "I :heart: $ &amp; €!"
    );
    expect(html`${insertedDollar}${emptyString}${unsafeString}!`).toEqual(
      "I :heart: $ &amp; €!"
    );
    expect(html`${insertedDollar}$${emptyString}${unsafeString}!`).toEqual(
      "I :heart: $ &amp; €!"
    );
    expect(html`$${insertedDollar}${emptyString}${unsafeString}!`).toEqual(
      "I :heart: $ &amp; €!"
    );
  });

  it("should generate valid HTML with an array of values", () => {
    const names = ["Megan", "Tiphaine", "Florent", "Hoan"];

    expect(
      html`<div>
        My best friends are:
        <ul>
          ${names.map((name) => html`<li>${name}</li>`)}
        </ul>
      </div>`
    ).toEqual(
      `<div>
        My best friends are:
        <ul>
          <li>Megan</li><li>Tiphaine</li><li>Florent</li><li>Hoan</li>
        </ul>
      </div>`
    );
  });

  it.each(attributesNoUri)(
    "should add quotes around attribute '%s'",
    (attribute) => {
      const value = "Alt onload=alert(1)";
      expect(html`<div ${attribute}=${value} />`).toEqual(
        `<div ${attribute}="Alt onload=alert(1)" />`
      );
    }
  );

  it.each(attributesNoUri)(
    "should not add quotes around attribute '%s' if they are already present",
    (attribute) => {
      const value = "Alt onload=alert(1)";
      expect(html`<div ${attribute}="${value}" />`).toEqual(
        `<div ${attribute}="Alt onload=alert(1)" />`
      );
    }
  );

  it.each(attributesUri)(
    "should remove the interpolation if preceeded by an attribute that takes a URI ('%s')",
    (attribute) => {
      const value = "some string";
      expect(html`<div ${attribute}="${value}" />`).toEqual(
        `<div ${attribute}="" />`
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "[html-template-tag] Trying to interpolate inside an URI attribute. This can lead to security vulnerabilities. The interpolation has been removed.",
        { acc: `<div ${attribute}="`, subst: value, lit: `" />` }
      );
    }
  );
});
