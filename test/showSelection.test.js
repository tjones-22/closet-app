import qunit from "qunit";
const { module, test } = qunit;

import { JSDOM } from "jsdom";

// Setup JSDOM
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

// Mock alert
let alertMessage = "";
global.alert = (msg) => {
  alertMessage = msg;
};
// Your showSelection function
function showSelection() {
  let choices = document.getElementsByName("choice");
  let quantityElement = document.getElementsByName('quantity')[0];

  if (!quantityElement) {
    alert("Quantity input not found.");
    return;
  }

  let quantity = parseInt(quantityElement.value, 10);
  let selectedValue = "";

  for (let choice of choices) {
    if (choice.checked) {
      selectedValue = choice.value;
      break;
    }
  }

  if (!selectedValue) {
    alert("Please select an option.");
    return;
  }

  if (isNaN(quantity) || quantity < 1) {
    alert("Please enter a valid quantity.");
    return;
  }

  let itemLabel = quantity > 1 ? selectedValue + "s" : selectedValue;
  alert(`You selected: ${quantity} ${itemLabel}`);
}

// Helper to setup test DOM
function setupMockDOM({ quantity, selectedValue }) {
  document.body.innerHTML = '';

  const quantityInput = document.createElement('input');
  quantityInput.name = 'quantity';
  quantityInput.value = quantity;
  document.body.appendChild(quantityInput);

  const choice1 = document.createElement('input');
  choice1.name = 'choice';
  choice1.type = 'radio';
  choice1.value = 'Shirt';

  const choice2 = document.createElement('input');
  choice2.name = 'choice';
  choice2.type = 'radio';
  choice2.value = 'Pants';

  if (selectedValue === 'Shirt') choice1.checked = true;
  if (selectedValue === 'Pants') choice2.checked = true;

  document.body.appendChild(choice1);
  document.body.appendChild(choice2);
}

// Tests
module('showSelection()', function () {
  test('alerts correct message when valid selection', function (assert) {
    setupMockDOM({ quantity: '2', selectedValue: 'Shirt' });
    alertMessage = "";
    showSelection();
    assert.strictEqual(alertMessage, 'You selected: 2 Shirts', 'Correct alert shown');
  });

  test('alerts error if no choice selected', function (assert) {
    setupMockDOM({ quantity: '2', selectedValue: null });
    alertMessage = "";
    showSelection();
    assert.strictEqual(alertMessage, 'Please select an option.', 'Error alert if no selection');
  });

  test('alerts error if invalid quantity', function (assert) {
    setupMockDOM({ quantity: '0', selectedValue: 'Pants' });
    alertMessage = "";
    showSelection();
    assert.strictEqual(alertMessage, 'Please enter a valid quantity.', 'Error alert for invalid quantity');
  });

  test('alerts error if quantity input missing', function (assert) {
    document.body.innerHTML = '';
    alertMessage = "";
    const choice = document.createElement('input');
    choice.name = 'choice';
    choice.type = 'radio';
    choice.value = 'Shirt';
    choice.checked = true;
    document.body.appendChild(choice);

    showSelection();
    assert.strictEqual(alertMessage, 'Quantity input not found.', 'Error alert for missing quantity input');
  });
});