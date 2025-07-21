let ferias = JSON.parse(localStorage.getItem("ferias")) || [];

if (!Array.isArray(ferias)) {
    ferias = [];
    localStorage.setItem("ferias", JSON.stringify(ferias));
}

const feriasForm = document.getElementById("feriasForm");
const emprendimientoForm = document.getElementById("emprendimientoForm");
const listaFerias = document.getElementById("listaFerias");
const feriasSelect = document.getElementById("feriasSelect");

function guardarFerias() {
    localStorage.setItem("ferias", JSON.stringify(ferias));

    if (window.opener) {
        window.opener.mostrarDatos();
    }
}

function actualizarFerias() {

    ferias = ferias.filter(feria => 
        feria && 
        feria.nombre && 
        feria.fechaini && 
        feria.fechaend && 
        feria.duracion
    );

    ferias.sort((a, b) => new Date(a.fechaini) - new Date(b.fechaini));
    guardarFerias();

    if (feriasSelect) {
        feriasSelect.innerHTML = ferias.length
            ? ferias.map((t, i) => `<option value="${i}">${t.nombre}</option>`).join("")
            : `<option disabled selected>No hay ferias disponibles</option>`;
    }

    if (listaFerias) {
        listaFerias.innerHTML = ferias.map(feria => `
            <div class="feria-card">
                <h3>${feria.nombre}</h3>
                <p><strong>Fecha inicio:</strong> ${new Date(feria.fechaini).toLocaleDateString()}</p>
                <p><strong>Fecha final:</strong> ${new Date(feria.fechaend).toLocaleDateString()}</p>
                <p><strong>Duración:</strong> ${feria.duracion} horas</p>
                ${feria.emprendimiento && feria.emprendimiento.length ? `
                    <h4>Emprendimientos:</h4>
                    <ul>
                        ${feria.emprendimiento.map(est => `
                            <li>${est.nombre} - ${est.categoria} - ${est.description}</li>
                        `).join("")}
                    </ul>
                ` : '<p>No hay emprendimientos registrados</p>'}
            </div>
        `).join("");
    }
}

if (feriasForm) {
    feriasForm.addEventListener("submit", e => {
        e.preventDefault();
        
        const fechaIni = new Date(document.getElementById("fechaini").value);
        const fechaEnd = new Date(document.getElementById("fechaend").value);
        
        if (fechaEnd < fechaIni) {
            alert("La fecha final debe ser posterior a la fecha de inicio");
            return;
        }

        const nuevoFerias = {
            nombre: document.getElementById("nombre").value.trim(),
            fechaini: document.getElementById("fechaini").value,
            fechaend: document.getElementById("fechaend").value,
            duracion: document.getElementById("duracion").value,
            emprendimiento: []
        };
        
        ferias.push(nuevoFerias);
        feriasForm.reset();
        actualizarFerias();
        alert("Feria registrada con éxito!");
    });
}

if (emprendimientoForm) {
    emprendimientoForm.addEventListener("submit", e => {
        e.preventDefault();
        const index = parseInt(feriasSelect.value);
        
        if (!isNaN(index) && ferias[index]) {
            const emprendimiento = {
                nombre: document.getElementById("nombreem").value.trim(),
                categoria: document.getElementById("categoria").value.trim(),
                description: document.getElementById("description").value.trim(),
                socials: document.getElementById("socials").value.trim(),
                product: document.getElementById("product").value.trim()
            };
            
            if (!ferias[index].emprendimiento) {
                ferias[index].emprendimiento = [];
            }
            
            ferias[index].emprendimiento.push(emprendimiento);
            emprendimientoForm.reset();
            actualizarFerias();
            alert("Emprendimiento registrado con éxito!");
        } else {
            alert("Por favor seleccione una feria válida");
        }
    });
}

document.addEventListener("DOMContentLoaded", actualizarFerias);