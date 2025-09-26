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
        <div class="material-card" data-id="${item.id}">
          <p><strong>Category:</strong> ${item.category}</p>
          <p><strong>Color:</strong> ${item.color}</p>
          <p><strong>Quantity:</strong> ${item.qty}</p>
          <p><strong>Length:</strong> ${item.length}</p>
          <p><strong>Price:</strong> $${item.price}</p>
          <button class="delete-button" data-id="${item.id}">Delete</button>
        </div>
      `
    )
    .join("");

  document.getElementById("resultWindow").innerHTML = html;

    // Attach delete listeners
  document.querySelectorAll(".delete-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      await deleteMaterial(id);
    });
  });
}

// Load all helper
async function loadAllMaterials() {
  const response = await fetch("http://127.0.0.1:8000/api/list/");
  const result = await response.json();
  renderMaterials(result);
}

// Add
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  /** @type {HTMLFormElement} */
  const form = e.target;

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
  form.reset();
  closePopUp("add");
});

// Filter
document.getElementById("filterForm").addEventListener("submit", async (e) => {
  e.preventDefault();
/** @type {HTMLFormElement} */
  const form = e.target;
  const color = document.getElementById("filterColor").value;

  const response = await fetch(`http://127.0.0.1:8000/api/filter/${color}/`);
  const result = await response.json();
  renderMaterials(result);
  form.reset();
  closePopUp("filter");
});

// View All
document.getElementById("viewButton").addEventListener("click", loadAllMaterials);

// Auto-load on first page load
document.addEventListener("DOMContentLoaded", loadAllMaterials);

// Delete
async function deleteMaterial(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}/`, {
    method: "DELETE",
  });

  const result = await response.json();
  if (result.success) {
    loadAllMaterials(); // reload updated list
  } else {
    alert("Delete failed: " + result.error);
  }
}
