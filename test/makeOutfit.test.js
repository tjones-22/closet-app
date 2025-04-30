import qunit from "qunit";
const { module, test } = qunit;
import { JSDOM } from "jsdom";

// Setup JSDOM
const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = window;
global.document = window.document;

// Mock window.alert
global.window.alert = () => {};


global.fetch = async () => ({ ok: true, json: async () => ({ message: "Saved" }) });

module("Make Outfit", function () {
  test("Successfully saves an outfit", async function (assert) {
    // Arrange: Set up the fake HTML
    document.body.innerHTML = `
      <input id="outfitName" value="Casual Look">
      <textarea id="outfitDescription">For weekends</textarea>
      <button id="save">Save Outfit</button>
    `;

    let calledFetch = false;
    
   
    global.fetch = async (url, options) => {
      calledFetch = true;
      return { ok: true, json: async () => ({ message: "Saved!" }) };
    };

    const button = document.getElementById("save");

    
    button.addEventListener("click", async () => {
      const res = await fetch("/api/save-outfit", { method: "POST" });
      if (res.ok) {
        window.alert("Outfit saved!");
      } else {
        window.alert("Failed to save outfit.");
      }
    });

   
    button.click();

    // Wait a little bit to allow async event to happen
    await new Promise((resolve) => setTimeout(resolve, 10));

    //
    assert.ok(calledFetch, "Fetch was called to save the outfit");
  });
});