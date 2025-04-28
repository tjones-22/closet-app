export function showSelection() {
    let choices = document.getElementsByName("choice");
    let quantityElement = document.getElementsByName('quantity')[0];
  
    if (!quantityElement) {
      alert("Quantity input not found.");
      return;
    }
  
    let quantity = parseInt(quantityElement.value, 10); 
    let selectedValue = "";
  
    console.log(quantity);
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