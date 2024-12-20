
document.getElementById('rentalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const carro = document.getElementById('carro').value;
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);
    const seguro = document.getElementById('seguro').value;

    const imagenesCarros = {
        'BMW': 'bmw_azul.jpg',
        'Mercedes': 'mercedez_negro', 
        'Twingo': 'twingo verde',
        'Megane': 'megane_rojo.jpg',
        'Chevrolet': 'chevrolet_gris'
    }
    const carroSelect = document.getElementById('carro');
const carroImagen = document.getElementById('carroImagen');

carroSelect.addEventListener('change', function() {
    const carroSeleccionado = this.value;
    
    if (carroSeleccionado) {
        carroImagen.src = imagenesCarros[carroSeleccionado];
        carroImagen.style.display = 'block';
    } else {
        carroImagen.style.display = 'none';
    }
});
    
    // Calcular días
    const dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    
    // Precios base por día
    const precios = {
        'BMW': 650000,
        'Mercedes': 700000,
        'Twingo': 100000,
        'Megane': 120000,
        'Chevrolet': 150000
    };
    
    // Precios seguros por día
    const preciosSeguros = {
        'basico': 20000,
        'completo': 35000,
        'premium': 50000
    };
    
    // Calcular precios
    const precioBase = precios[carro] * dias;
    const precioSeguro = preciosSeguros[seguro] * dias;
    
    // Calcular adicionales
    let adicionales = 0;
    if(document.getElementById('gps').checked) adicionales += 10000 * dias;
    if(document.getElementById('sillaBebe').checked) adicionales += 8000 * dias;
    if(document.getElementById('conductor').checked) adicionales += 15000 * dias;
    
    let descuento = 0;
    // Aplicar descuentos según días
    if (dias >= 3 && dias <= 5) {
        descuento = precioBase * 0.10;  // 10% descuento
    } else if (dias >= 6 && dias <= 10) {
        descuento = precioBase * 0.15;  // 15% descuento
    } else if (dias > 10) {
        descuento = precioBase * 0.20;  // 20% descuento
    }
    
    const precioTotal = precioBase + precioSeguro + adicionales - descuento;
    
    // Definir color de fondo según días
    let backgroundColor;
    if (dias <= 2) {
        backgroundColor = 'orange';
    } else if (dias <= 5) {
        backgroundColor = 'yellow';
    } else if (dias <= 10) {
        backgroundColor = 'green';
    } else {
        backgroundColor = 'blue';
    }
    
    
    const resultado = document.getElementById('resultado');
    resultado.style.backgroundColor = backgroundColor;
    resultado.style.color = backgroundColor === 'blue' ? 'white' : 'black';
    resultado.innerHTML = `
        <h3>Resumen del Alquiler</h3>
        <div class="resultado-contenido">
            <div class="resultado-imagen">
                <img src="${imagenesCarros[carro]}" alt="${carro}" style="max-width: 100%; border-radius: 8px;">
            </div>
        <table>
            <tr>
                <th>Cliente:</th>
                <td>${nombre}</td>
            </tr>
            <tr>
                <th>Vehículo:</th>
                <td>${carro}</td>
            </tr>
            <tr>
                <th>Período:</th>
                <td>${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()} (${dias} días)</td>
            </tr>
            <tr>
                <th>Precio base:</th>
                <td>$${precioBase.toLocaleString()}</td>
            </tr>
            <tr>
                <th>Descuento:</th>
                <td>$${descuento.toLocaleString()} (${descuento > 0 ? 'Aplicado' : 'Sin descuento'})</td>
            </tr>
            <tr>
                <th>Seguro (${seguro}):</th>
                <td>$${precioSeguro.toLocaleString()}</td>
            </tr>
            <tr>
                <th>Adicionales:</th>
                <td>$${adicionales.toLocaleString()}</td>
            </tr>
            <tr>
                <th>Total a pagar:</th>
                <td><strong>$${precioTotal.toLocaleString()}</strong></td>
            </tr>
        </table>
    `;
});

// Validar fechas
document.getElementById('fechaInicio').addEventListener('change', function() {
    document.getElementById('fechaFin').min = this.value;
});

document.getElementById('fechaFin').addEventListener('change', function() {
    document.getElementById('fechaInicio').max = this.value;
});

// Establecer fecha mínima como hoy
const today = new Date().toISOString().split('T')[0];
document.getElementById('fechaInicio').min = today;
document.getElementById('fechaFin').min = today;
// Funcionalidad para el modal de imágenes
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close-modal');

// Agregar el evento click a todas las imágenes de los carros
document.querySelectorAll('.car-card img').forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('active');
        modalImg.src = this.src;
    });
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Cerrar el modal al hacer clic fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Cerrar el modal con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
    }
});
