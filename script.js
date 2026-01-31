const products = [
  { id: 1, name: "Chair",subname: "Sakarias Armchair", category: "chair", price: 120, image: "chair1.png",rating: "stars.png" },
  { id: 2, name: "Chair",subname: "Baltsar Chair", category: "chair", price: 150, image: "chair2.png",rating:"stars.png" },
  { id: 3, name: "Chair",subname: "Anjay Chair", category: "chair", price: 600, image: "chair3.png",rating:"stars.png" },
   { id: 4, name: "Chair",subname: "Nyantuy Chair", category: "chair", price: 600, image: "chair4.png",rating:"stars.png" },
  { id: 5, name: "Luxury Bed", category: "bed", price: 900, image: "chair4.png",rating:"stars.png" },
   { id: 6, name: "Chair",subname: "Anjay Chair", category: "chair", price: 150, image: "chair2.png" },
  { id: 7, name: "Sofa Comfort", category: "sofa", price: 600, image: "chair3.png" },
  { id: 8, name: "Luxury Bed", category: "bed", price: 900, image: "chair4.png" },
  { id: 9, name: "Night Lamp", category: "lamp", price: 90, image: "lamp1.jpg" },
   { id: 10, name: "Chair Classic", category: "chair", price: 150, image: "chair2.png" },
 
  { id: 11, name: "Luxury Bed", category: "bed", price: 900, image: "chair4.png" },
   { id: 12, name: "Chair Classic", category: "chair", price: 150, image: "chair2.png" },
  { id: 13, name: "Sofa Comfort", category: "sofa", price: 600, image: "chair3.png" },
  { id: 14, name: "Luxury Bed", category: "bed", price: 900, image: "chair4.png" },
   { id: 15, name: "Chair Classic", category: "chair", price: 150, image: "chair2.png" },
  { id: 16, name: "Sofa Comfort", category: "sofa", price: 600, image: "chair3.png" },
  { id: 17, name: "Luxury Bed", category: "bed", price: 900, image: "chair4.png" },
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
        <div class="col-6 col-md-3 col-lg-3">
          <div class="card item text-start">
            <img src="images/${p.image}" class="card-img-top">
            <div class="card-body">
              <h6 class="text-start">${p.name}</h6>
              <h2 class="text-start txt9">${p.subname}</h2>
              <img src="images/${p.rating}"class="text-start">
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
