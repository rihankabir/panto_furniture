const products = [
  { id: 1, name: "Chair Modern", category: "chair", price: 120, image: "chair1.jpg" },
  { id: 2, name: "Chair Classic", category: "chair", price: 150, image: "chair2.jpg" },
  { id: 3, name: "Sofa Comfort", category: "sofa", price: 600, image: "sofa1.jpg" },
  { id: 4, name: "Luxury Bed", category: "bed", price: 900, image: "bed1.jpg" },
  { id: 5, name: "Night Lamp", category: "lamp", price: 90, image: "lamp1.jpg" },
];

let cartCount = 0;
let currentCategory = "chair";

const carouselInner = document.getElementById("carouselInner");
const searchInput = document.getElementById("searchInput");

/* RENDER PRODUCTS INTO CAROUSEL (GRID FIXED) */
function renderProducts(list) {
  carouselInner.innerHTML = "";

  for (let i = 0; i < list.length; i += 4) {
    const chunk = list.slice(i, i + 4);

    let slide = `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row g-3">
    `;

    chunk.forEach(p => {
      slide += `
        <div class="col-6 col-md-3">
          <div class="card h-100 text-center">
            <img src="images/${p.image}" class="card-img-top">
            <div class="card-body">
              <h6>${p.name}</h6>
              <p>$${p.price}</p>
              <button class="btn btn-sm btn-warning" onclick="addToCart()">Add to cart</button>
            </div>
          </div>
        </div>
      `;
    });

    slide += `
        </div>
      </div>
    `;

    carouselInner.innerHTML += slide;
  }
}

/* FILTER */
function loadProducts() {
  const search = searchInput.value.toLowerCase();

  const filtered = products.filter(p =>
    p.category === currentCategory &&
    p.name.toLowerCase().includes(search)
  );

  renderProducts(filtered);
}

/* CART */
function addToCart() {
  cartCount++;
  document.getElementById("cartCount").innerText = cartCount;
}

/* TAB CLICK */
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".tab-btn.active").classList.remove("active");
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    loadProducts();
  });
});

/* SEARCH */
searchInput.addEventListener("input", loadProducts);

/* INITIAL LOAD */
loadProducts();
