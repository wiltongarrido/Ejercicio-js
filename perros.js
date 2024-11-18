// Precios base por raza
const preciosBase = {
    'Pastor Alemán': 2000000,
    'Labrador': 1800000,
    'Golden Retriever': 1900000,
    'Bulldog': 2200000,
    'Husky': 2100000
};

// Multiplicadores por posición
const multiplicadores = {
    'first-place': 1.5,  // 50% de incremento para el primer lugar
    'second-place': 1.3, // 30% de incremento para el segundo lugar
    'third-place': 1.1   // 10% de incremento para el tercer lugar
};

// Función para actualizar los precios y resultados
function actualizarResultados() {
    const resultados = [];
    let todosSeleccionados = true;

    // Recolectar información de cada perro
    ['first-place', 'second-place', 'third-place'].forEach((position, index) => {
        const select = document.getElementById(`dog${index + 1}`);
        const raza = select.value;
        
        if (!raza) {
            todosSeleccionados = false;
            return;
        }

        const precioBase = preciosBase[raza];
        const precioNuevo = precioBase * multiplicadores[position];
        
        // Actualizar la información de precio en la tarjeta
        const card = document.getElementById(position);
        const priceInfo = card.querySelector('.price-info');
        priceInfo.textContent = `Precio: $${precioNuevo.toLocaleString()}`;

        resultados.push({
            posicion: index + 1,
            raza: raza,
            precioOriginal: precioBase,
            precioNuevo: precioNuevo
        });
    });

    // Actualizar el resumen de resultados
    if (todosSeleccionados) {
        const resultsContainer = document.getElementById('competition-results');
        resultsContainer.innerHTML = resultados.map(result => `
            <div style="background: ${getBackgroundColor(result.posicion)}; padding: 1rem; margin: 0.5rem 0; border-radius: 5px; color: ${result.posicion === 1 ? 'black' : 'white'};">
                <h3>${result.posicion}º Lugar - ${result.raza}</h3>
                <p>Precio Original: $${result.precioOriginal.toLocaleString()}</p>
                <p>Nuevo Precio: $${result.precioNuevo.toLocaleString()}</p>
                <p>Incremento: ${((multiplicadores[`${getPositionName(result.posicion)}`] - 1) * 100).toFixed(0)}%</p>
            </div>
        `).join('');
    }
}

// Función auxiliar para obtener el nombre de la posición
function getPositionName(position) {
    const positions = {
        1: 'first-place',
        2: 'second-place',
        3: 'third-place'
    };
    return positions[position];
}

// Función auxiliar para obtener el color de fondo según la posición
function getBackgroundColor(position) {
    const colors = {
        1: '#ffd700',
        2: '#808080',
        3: '#cd7f32'
    };
    return colors[position];
}

// Agregar event listeners a todos los selectores
document.querySelectorAll('.dog-select').forEach(select => {
    select.addEventListener('change', actualizarResultados);
});