document.getElementById('nominaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const salarioBase = parseFloat(document.getElementById('salarioBase').value);
    const diasTrabajados = parseInt(document.getElementById('diasTrabajados').value);
    const horasExtra = parseInt(document.getElementById('horasExtra').value);
    
    // Cálculos de ingresos
    const salarioDiario = salarioBase / 30;
    const salarioDiasTrabajados = salarioDiario * diasTrabajados;
    const valorHoraExtra = (salarioBase / 240) * 1.25; // 1.25 es el recargo del 25%
    const totalHorasExtra = valorHoraExtra * horasExtra;
    
    const totalIngresos = salarioDiasTrabajados + totalHorasExtra;
    
    // Cálculos de egresos
    const salud = totalIngresos * 0.04;
    const pension = totalIngresos * 0.04;
    const totalEgresos = salud + pension;
    
    // Salario total
    const salarioTotal = totalIngresos - totalEgresos;
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <h3>Resumen de Nómina - ${nombre}</h3>
        <div class="total-ingresos">
            <h4>Total Ingresos: $${totalIngresos.toLocaleString()}</h4>
            <p>Salario por días trabajados: $${salarioDiasTrabajados.toLocaleString()}</p>
            <p>Valor horas extra: $${totalHorasExtra.toLocaleString()}</p>
        </div>
        <div class="total-egresos">
            <h4>Total Egresos: $${totalEgresos.toLocaleString()}</h4>
            <p>Salud (4%): $${salud.toLocaleString()}</p>
            <p>Pensión (4%): $${pension.toLocaleString()}</p>
        </div>
        <div class="total-salario">
            <h3>Salario Total a Recibir: $${salarioTotal.toLocaleString()}</h3>
        </div>
    `;
});