window.addEventListener("DOMContentLoaded", (event) => {
  const itemList = document.getElementById("item-list");
  const addBtn = document.getElementById("add-item-btn");
  const netTotal = document.getElementById("net-total");
  const grossTotal = document.getElementById("gross-total");
  const vatTotal = document.getElementById("vat-total");
  const totalAmount = document.getElementById("total-amount");
  const descriptionInput = document.getElementById("description-input");
  const quantityInput = document.getElementById("quantity-input");
  const priceInput = document.getElementById("price-input");
  const vatCheckbox = document.getElementById("vat-checkbox-input");
  const printBtn = document.getElementById("print-btn");
  const tbody = itemList.querySelector("tbody"); // tbody-Element in itemList finden

  let items = []; // Array, um Posten zu speichern
  let includeVAT = false;

  // Funktion zum Hinzufügen eines neuen Postens
  const addItem = () => {
    const description = descriptionInput.value.trim();
    const quantity = parseFloat(quantityInput.value);
    const price = parseFloat(priceInput.value);

    if (description && !isNaN(quantity) && !isNaN(price)) {
      const item = {
        description: description,
        quantity: quantity,
        price: price
      };

      items.push(item);
      renderItems();

      // Eingabefelder leeren
      descriptionInput.value = "";
      quantityInput.value = "";
      priceInput.value = "";
    } else {
      alert("Ungültige Eingabe!");
    }
  };

  // Funktion zum Entfernen eines Postens
  const removeItem = (index) => {
    items.splice(index, 1);
    renderItems();
  };

// Funktion zum Rendern der Posten
const renderItems = () => {
  tbody.innerHTML = ""; // Nur tbody leeren

  let nettoSumme = 0;
  let bruttoSumme = 0;
  let mehrwertsteuerSumme = 0;

  items.forEach((item, index) => {
    const row = document.createElement("tr");

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = item.description;
    row.appendChild(descriptionCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    row.appendChild(quantityCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = item.price.toFixed(2) + " €";
    row.appendChild(priceCell);

    const totalCell = document.createElement("td");
    const total = item.quantity * item.price;
    totalCell.textContent = total.toFixed(2) + " €";
    row.appendChild(totalCell);

    const actionsCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Entfernen";
    removeBtn.addEventListener("click", () => removeItem(index));
    actionsCell.appendChild(removeBtn);
    row.appendChild(actionsCell);

    tbody.appendChild(row); // Zu tbody hinzufügen

    nettoSumme += total;
    bruttoSumme += total;
  });

  netTotal.textContent = nettoSumme.toFixed(2) + " €";
  grossTotal.textContent = bruttoSumme.toFixed(2) + " €";

  if (includeVAT) {
    const mehrwertsteuer = bruttoSumme * 0.19;
    bruttoSumme += mehrwertsteuer;
    mehrwertsteuerSumme = mehrwertsteuer;
  }

  vatTotal.textContent = mehrwertsteuerSumme.toFixed(2) + " €";
  totalAmount.textContent = bruttoSumme.toFixed(2) + " €";
};


  addBtn.addEventListener("click", addItem);
console.log("Script loaded"); // Überprüfen, ob das Skript geladen wird

vatCheckbox.addEventListener("change", (event) => {
  includeVAT = event.target.checked;
  renderItems();
});



  printBtn.addEventListener("click", () => {
    window.print();
  });
});
