import html from "../src/index.ts";

describe("html-template-tag", () => {
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
    const chars = {
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
});
