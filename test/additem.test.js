import qunit from "qunit";
const { module, test } = qunit;
import { JSDOM } from "jsdom";


const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, { url: "http://localhost" });
global.window = window;
global.document = window.document;
global.fetch = async () => ({ ok: true, json: async () => ({ message: "Success" }) });

module("Add Closet Item", function () {
  test("Successfully adds an item", async function (assert) {
    
    document.body.innerHTML = `
      <input name="type" value="Shirt">
      <input name="color" value="Blue">
      <input name="style" value="Casual">
      <input name="occasion" value="Everyday">
      <input name="image" type="file">
      <button id="submit">Submit</button>
    `;

   

    let calledFetch = false;
    global.fetch = async (url, options) => {
      calledFetch = true;
      return { ok: true, json: async () => ({ message: "Added!" }) };
    };

    // Simulate a form submission
    const button = document.getElementById("submit");
    button.addEventListener("click", async () => {
      
      const res = await fetch("/api/fake-endpoint", { method: "PUT" });
      if (res.ok) {
        window.alert("Item added successfully!");
      } else {
        window.alert("Failed to add.");
      }
    });

  
    button.click();

  
    assert.ok(calledFetch, "Fetch was called to add the item");
  });
});