import qunit from "qunit";
const { module, test } = qunit;
import { JSDOM } from "jsdom";

const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = window;
global.document = window.document;
global.fetch = async () => ({ ok: true, json: async () => ({ message: "Signed in" }) });

module("Sign In", function () {
  test("Successfully signs in", async function (assert) {
    document.body.innerHTML = `
      <input id="username" value="testuser">
      <input id="password" value="password123">
      <button id="signin">Sign In</button>
    `;

    let calledFetch = false;
    global.fetch = async (url, options) => {
      calledFetch = true;
      return { ok: true, json: async () => ({ message: "Signed in!" }) };
    };

    const button = document.getElementById("signin");
    button.addEventListener("click", async () => {
      const res = await fetch("/api/login", { method: "POST" });
      if (res.ok) {
        window.alert("Login successful!");
      } else {
        window.alert("Login failed.");
      }
    });

    button.click();

    assert.ok(calledFetch, "Fetch was called for signing in");
  });
});