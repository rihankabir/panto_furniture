const products = [
  { id: 1, name: "Chair A", category: "chair", price: 120 },
  { id: 2, name: "Chair B", category: "chair", price: 150 },
  { id: 3, name: "Chair C", category: "chair", price: 180 },
  { id: 4, name: "Chair D", category: "chair", price: 200 },
  { id: 5, name: "Chair E", category: "chair", price: 230 },

  { id: 6, name: "Bed A", category: "bed", price: 900 },
  { id: 7, name: "Bed B", category: "bed", price: 1100 },
  { id: 8, name: "Bed C", category: "bed", price: 1300 },

  { id: 9, name: "Sofa A", category: "sofa", price: 600 },
  { id: 10, name: "Sofa B", category: "sofa", price: 700 },
  { id: 11, name: "Sofa C", category: "sofa", price: 800 },
 

  { id: 14, name: "Lamp A", category: "lamp", price: 90 },
  { id: 15, name: "Lamp B", category: "lamp", price: 120 }
];

/* ===== STATE ===== */
let currentCategory = "chair";
let currentSlide = 0;
const itemsPerPage = 10;
let cartCount = 0;
let searchText = "";

/* ===== TAB LOGIC ===== */
document.querySelectorAll(".tab-btn").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentCategory = tab.dataset.category;
    currentSlide = 0;
    renderCarousel();
  });
});

/* ===== SEARCH LOGIC ===== */
document.getElementById("searchInput").addEventListener("input", e => {
  searchText = e.target.value.toLowerCase();
  currentSlide = 0;
  renderCarousel();
});

/* ===== RENDER CAROUSEL ===== */
function renderCarousel() {
  const track = document.getElementById("carouselTrack");
  track.innerHTML = "";

  const filtered = products.filter(p =>
    p.category === currentCategory &&
    p.name.toLowerCase().includes(searchText)
  );

  filtered.forEach(p => {
    track.innerHTML += `
    
      <div class="card">
        <div class="card shadow-sm h-100">
          <div class="card-body text-center">
            <h6>${p.name}</h6>
            <p>$${p.price}</p>
            <button class="btn btn-sm btn-dark" onclick="addToCart()">Add to Cart</button>
          </div>
        </div>
      </div>
      
      
    `;
  });

  updateSlide(filtered.length);
}

/* ===== SLIDE ===== */
function updateSlide(totalItems) {
  const track = document.getElementById("carouselTrack");
  const maxSlide = Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);

  if (currentSlide > maxSlide) currentSlide = maxSlide;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function next() {
  const filteredCount = products.filter(
    p => p.category === currentCategory && p.name.toLowerCase().includes(searchText)
  ).length;

  const maxSlide = Math.ceil(filteredCount / itemsPerPage) - 1;
  if (currentSlide < maxSlide) {
    currentSlide++;
    updateSlide(filteredCount);
  }
}

function prev() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide(0);
  }
}

/* ===== CART ===== */
function addToCart() {
  cartCount++;
  document.getElementById("cartCount").innerText = cartCount;
}

/* ===== INIT ===== */
renderCarousel();