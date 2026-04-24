// ====================== js/main.js ======================

// Renderizar Header
function renderHeader() {
  const header = document.getElementById('header');
  header.innerHTML = `
    <div class="bg-black sticky top-0 z-50 border-b border-red-900">
      <div class="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-cow text-3xl text-red-600"></i>
          <div>
            <h1 class="titulo-carniceria text-3xl font-bold tracking-tight text-white">CARNICERÍA ALERCE</h1>
            <p class="text-xs text-red-500 -mt-1">Calidad desde 1998 • Santiago</p>
          </div>
        </div>
        
        <button onclick="toggleCarrito()" class="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
          <i class="fa-solid fa-cart-shopping"></i>
          <span>Carrito</span>
          <span id="contador-carrito" class="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">0</span>
        </button>
      </div>
    </div>
  `;
}

// Renderizar Hero
function renderHero() {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <section class="bg-[url('https://picsum.photos/id/1015/2000/1200')] bg-cover bg-center h-[420px] relative">
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black"></div>
      <div class="max-w-7xl mx-auto px-4 h-full flex items-center relative">
        <div class="max-w-lg">
          <p class="uppercase tracking-[4px] text-red-500 text-sm font-medium mb-2">Carnes premium</p>
          <h2 class="text-6xl font-bold leading-none titulo-carniceria">LO MEJOR DEL CAMPO A TU MESA</h2>
          <p class="mt-6 text-lg text-zinc-300">Cortes seleccionados diariamente</p>
          <button onclick="document.getElementById('cortes').scrollIntoView({ behavior: 'smooth' })" 
                  class="mt-8 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3">
            VER CORTES
            <i class="fa-solid fa-arrow-down"></i>
          </button>
        </div>
      </div>
    </section>
  `;
}

// Renderizar Footer
function renderFooter() {
  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <footer class="bg-black border-t border-red-900 py-12">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-zinc-400 text-sm">© 2026 Carnicería Alerce - Santiago, Chile</p>
        <p class="text-zinc-500 text-xs mt-2">Delivery • WhatsApp: +56 9 XXXX XXXX</p>
      </div>
    </footer>
  `;
}

// Renderizar los cortes
function renderizarCortes() {
  const grid = document.getElementById('grid-cortes');
  if (!grid) return;

  grid.innerHTML = '';

  cortes.forEach(corte => {
    const card = document.createElement('div');
    card.className = `bg-zinc-900 rounded-3xl overflow-hidden card-hover`;

    card.innerHTML = `
      <div class="relative">
        <img src="${corte.img}" alt="${corte.nombre}" 
             class="foto-corte w-full h-56 object-cover">
        <div class="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-2xl text-sm font-bold">
          $${corte.precio.toLocaleString('es-CL')}
        </div>
      </div>
      <div class="p-5">
        <h3 class="font-bold text-xl mb-2">${corte.nombre}</h3>
        <p class="text-zinc-400 text-sm leading-relaxed line-clamp-3">${corte.descripcion}</p>
        
        <div class="mt-6 flex gap-3">
          <button onclick="agregarAlCarrito(${corte.id})" 
                  class="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95">
            AGREGAR
          </button>
          <button onclick="verDetalle(${corte.id})" 
                  class="flex-1 border border-zinc-700 hover:border-zinc-500 py-3 rounded-2xl font-semibold text-sm transition-all">
            DETALLE
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Función detalle
function verDetalle(id) {
  const corte = cortes.find(c => c.id === id);
  if (corte) {
    alert(`${corte.nombre}\n\n${corte.descripcion}\n\nPrecio: $${corte.precio.toLocaleString('es-CL')}`);
  }
}

// Inicializar todo
function init() {
  renderHeader();
  renderHero();
  renderFooter();
  renderizarCortes();
  actualizarContadorCarrito();
}

// Iniciar
window.onload = init;