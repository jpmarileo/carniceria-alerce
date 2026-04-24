// ====================== js/cart.js ======================

let carrito = [];

function agregarAlCarrito(id) {
  const corte = cortes.find(c => c.id === id);
  if (!corte) return;

  const existe = carrito.find(item => item.id === id);
  
  if (existe) {
    existe.cantidad = (existe.cantidad || 1) + 1;
  } else {
    carrito.push({ ...corte, cantidad: 1 });
  }

  actualizarContadorCarrito();
  mostrarNotificacion(`✅ ${corte.nombre} agregado`);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  renderizarCarrito();
  actualizarContadorCarrito();
}

function cambiarCantidad(index, nuevaCantidad) {
  if (nuevaCantidad < 1) return;
  carrito[index].cantidad = nuevaCantidad;
  renderizarCarrito();
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    contador.textContent = totalItems;
  }
}

function mostrarNotificacion(mensaje) {
  const notif = document.createElement('div');
  notif.className = "fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-medium z-[200]";
  notif.textContent = mensaje;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2200);
}

// ==================== RENDERIZADO DEL CARRITO ====================
function renderizarCarrito() {
  const modalContent = document.getElementById('modal-carrito');
  
  let html = `
    <div class="bg-zinc-900 w-full max-w-lg rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="p-6 border-b border-zinc-700 flex justify-between items-center bg-black">
        <h3 class="text-2xl font-bold flex items-center gap-3">
          <i class="fa-solid fa-cart-shopping text-red-500"></i>
          Tu Carrito
        </h3>
        <button onclick="toggleCarrito()" class="text-4xl leading-none text-zinc-400 hover:text-white">×</button>
      </div>

      <!-- Lista de productos -->
      <div class="flex-1 overflow-y-auto p-6" id="lista-carrito">
  `;

  if (carrito.length === 0) {
    html += `
      <div class="text-center py-20 text-zinc-500">
        <i class="fa-solid fa-cart-shopping text-6xl mb-4 opacity-30"></i>
        <p class="text-lg">Tu carrito está vacío</p>
        <p class="text-sm mt-2">Agrega algunos cortes deliciosos</p>
      </div>
    `;
  } else {
    let total = 0;

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      html += `
        <div class="flex gap-4 mb-6 bg-zinc-800 rounded-2xl p-4">
          <img src="${item.img}" class="w-20 h-20 object-cover rounded-xl">
          <div class="flex-1">
            <p class="font-semibold text-lg">${item.nombre}</p>
            <p class="text-red-500 font-bold">$${item.precio.toLocaleString('es-CL')}</p>
            
            <div class="flex items-center gap-3 mt-3">
              <button onclick="cambiarCantidad(${index}, ${item.cantidad - 1})" 
                      class="w-8 h-8 flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 rounded-lg text-lg font-bold">-</button>
              <span class="font-medium w-8 text-center">${item.cantidad}</span>
              <button onclick="cambiarCantidad(${index}, ${item.cantidad + 1})" 
                      class="w-8 h-8 flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 rounded-lg text-lg font-bold">+</button>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-lg text-red-500">$${subtotal.toLocaleString('es-CL')}</p>
            <button onclick="eliminarDelCarrito(${index})" 
                    class="text-red-500 hover:text-red-600 mt-4 text-xl">🗑</button>
          </div>
        </div>
      `;
    });

    html += `
      </div>
      <!-- Total y botón pagar -->
      <div class="p-6 border-t border-zinc-700 bg-black">
        <div class="flex justify-between items-center text-xl mb-6">
          <span class="font-medium">Total a pagar</span>
          <span class="font-bold text-3xl text-red-500">$${total.toLocaleString('es-CL')}</span>
        </div>
        <button onclick="finalizarCompra()" 
                class="w-full bg-red-600 hover:bg-red-700 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 active:scale-95 transition-all">
          <i class="fa-solid fa-whatsapp"></i>
          PEDIR POR WHATSAPP
        </button>
        <p class="text-center text-xs text-zinc-500 mt-4">Te contactaremos para confirmar</p>
      </div>
    `;
  }

  modalContent.innerHTML = html + `</div>`;
}

function toggleCarrito() {
  const modal = document.getElementById('modal-carrito');
  modal.classList.toggle('hidden');
  
  if (!modal.classList.contains('hidden')) {
    renderizarCarrito();
  }
}

function finalizarCompra() {
  if (carrito.length === 0) return;

  let mensaje = `🛒 *Pedido Carnicería Alerce*\n\n`;
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    mensaje += `• ${item.cantidad} × ${item.nombre} = $${subtotal.toLocaleString('es-CL')}\n`;
    total += subtotal;
  });

  mensaje += `\n*Total: $${total.toLocaleString('es-CL')}*\n\n`;
  mensaje += `¿Me puedes confirmar disponibilidad y horario de entrega?`;

// ====================== CARRUSEL ======================
let currentSlide = 0;
let carruselInterval;

const slides = [
  {
    img: "https://picsum.photos/id/201/1200/800",
    titulo: "Lomo Vetado",
    subtitulo: "El rey de la parrilla"
  },
  {
    img: "https://picsum.photos/id/237/1200/800",
    titulo: "Posta Negra",
    subtitulo: "Jugosa y tierna"
  },
  {
    img: "https://picsum.photos/id/292/1200/800",
    titulo: "Costillar de Cerdo",
    subtitulo: "Ideal para horno"
  },
  {
    img: "https://picsum.photos/id/312/1200/800",
    titulo: "Punta de Ganso",
    subtitulo: "Sabor chileno tradicional"
  }
];

function renderCarrusel() {
  const carruselContainer = document.getElementById('carrusel');
  carruselContainer.innerHTML = '';

  slides.forEach((slide, index) => {
    const div = document.createElement('div');
    div.className = `absolute inset-0 transition-opacity duration-700 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
    div.innerHTML = `
      <img src="${slide.img}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      <div class="absolute bottom-16 left-8 max-w-md">
        <p class="text-red-500 font-medium tracking-widest">RECOMENDADO</p>
        <h2 class="text-5xl font-bold titulo-carniceria mt-2">${slide.titulo}</h2>
        <p class="text-xl text-zinc-300 mt-2">${slide.subtitulo}</p>
        <button onclick="agregarAlCarrito(${cortes[index].id});" 
                class="mt-6 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold flex items-center gap-3">
          AGREGAR AL CARRITO
        </button>
      </div>
    `;
    carruselContainer.appendChild(div);
  });

  renderIndicadores();
}

function renderIndicadores() {
  const container = document.getElementById('indicadores');
  container.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-red-600 scale-125' : 'bg-white/50'}`;
    dot.onclick = () => goToSlide(index);
    container.appendChild(dot);
  });
}

function showSlide(index) {
  currentSlide = index;
  const slidesElements = document.querySelectorAll('#carrusel > div');
  slidesElements.forEach((slide, i) => {
    slide.style.opacity = i === currentSlide ? '1' : '0';
  });
  renderIndicadores();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function goToSlide(index) {
  showSlide(index);
}

// Auto-play
function startCarruselAuto() {
  if (carruselInterval) clearInterval(carruselInterval);
  carruselInterval = setInterval(nextSlide, 5000);
}

  const numero = "56982121220"; // Cambia por tu número real
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
}