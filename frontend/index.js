//PopUp Controll

function openPopUp(id) {
  document.getElementById(id).classList.add("active");
}

function closePopUp(id) {
  document.getElementById(id).classList.remove("active");
}

//Backend connections

function renderMaterials(materials) {
  if (!materials.length) {
    document.getElementById("resultWindow").innerHTML = "<p>No results found.</p>";
    return;
  }

    const html = materials
    .map(
      (item) => `
        <div class="material-card">
          <p><strong>Category:</strong> ${item.category}</p>
          <p><strong>Color:</strong> ${item.color}</p>
          <p><strong>Quantity:</strong> ${item.qty}</p>
          <p><strong>Length:</strong> ${item.length}</p>
          <p><strong>Price:</strong> $${item.price}</p>
        </div>
      `
    )
    .join("");

  document.getElementById("resultWindow").innerHTML = html;
}

// Add
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    category: document.getElementById("category").value,
    color: document.getElementById("color").value,
    qty: document.getElementById("qty").value,
    length: document.getElementById("length").value,
    price: document.getElementById("price").value,
  };

  const response = await fetch("http://127.0.0.1:8000/api/add/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  renderMaterials(result);
  closePopUp("add");
});

// Filter
document.getElementById("filterForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const color = document.getElementById("filterColor").value;

  const response = await fetch(`http://127.0.0.1:8000/api/filter/${color}/`);
  const result = await response.json();
  renderMaterials(result);
  closePopUp("filter");
});

// View All
document.getElementById("viewButton").addEventListener("click", async () => {
  const response = await fetch("http://127.0.0.1:8000/api/list/");
  const result = await response.json();
  renderMaterials(result);
});
