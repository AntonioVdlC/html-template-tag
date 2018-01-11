import {expect} from "chai";
import html from "../src/index.js";

describe("html-template-tag", () => {
	it("should return a string when passed a string literal", () => {
		expect(typeof html`Hello, world!`).to.equal("string");
	});

	it("should preserve the string literal value", () => {
		expect(html`Hello, world!`).to.equal("Hello, world!");
	});

	it("should interpolate variables", () => {
		let name = "Antonio";
		expect(html`Hello, ${name}!`).to.equal("Hello, Antonio!");
	});

	it("should escape HTML special characters", () => {
		const chars = {
			"&": "&amp;",
			">": "&gt;",
			"<": "&lt;",
			'"': "&quot;",
			"'": "&#39;",
			"`": "&#96;"
		};

		Object.keys(chars).forEach((key) => {	
			let string = key;
			expect(html`${key}`).to.equal(chars[key]);
		});
	});

	it("should skip escaping HTML special characters for substituitions with double $", () => {
		let safeString = "<strong>Antonio</strong>"
		expect(html`Hello, $${safeString}!`).to.equal("Hello, <strong>Antonio</strong>!");
	})

	it("should generate valid HTML with an array of values", () => {
		let names = ["Megan", "Tiphaine", "Florent", "Hoan"];

		expect(html`<div>My best friends are:<ul>${names.map(name => html`<li>${name}</li>`)}</ul></div>`).to.equal("<div>My best friends are:<ul><li>Megan</li><li>Tiphaine</li><li>Florent</li><li>Hoan</li></ul></div>");
	});
});
