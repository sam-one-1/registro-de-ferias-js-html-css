function mostrarDatos() {

    const ferias = JSON.parse(localStorage.getItem("ferias")) || [];
    
  
    const listaFerias = document.getElementById("listaFerias");
    if (listaFerias) {
        listaFerias.innerHTML = ferias.length > 0 
            ? ferias.map(feria => `
                <div class="feria-card">
                    <h3>${feria.nombre}</h3>
                    <p><strong>Fecha inicio:</strong> ${new Date(feria.fechaini).toLocaleDateString()}</p>
                    <p><strong>Fecha final:</strong> ${new Date(feria.fechaend).toLocaleDateString()}</p>
                    <p><strong>Duración:</strong> ${feria.duracion} horas</p>
                    <p><strong>Emprendimientos:</strong> ${feria.emprendimiento ? feria.emprendimiento.length : 0}</p>
                </div>
            `).join("")
            : "<p>No hay ferias registradas todavía.</p>";
    }

 
    const listaEmprendimientos = document.getElementById("listaEmprendimientos");
    if (listaEmprendimientos) {

        const todosEmprendimientos = ferias.flatMap(feria => 
            feria.emprendimiento ? feria.emprendimiento.map(emp => ({
                ...emp,
                feriaNombre: feria.nombre
            })) : []
        );

        listaEmprendimientos.innerHTML = todosEmprendimientos.length > 0
            ? todosEmprendimientos.map(emp => `
                <div class="emprendimiento-card">
                    <h3>${emp.nombre}</h3>
                    <p><strong>Feria:</strong> ${emp.feriaNombre}</p>
                    <p><strong>Categoría:</strong> ${emp.categoria}</p>
                    <p><strong>Descripción:</strong> ${emp.description}</p>
                    <p><strong>Redes sociales:</strong> ${emp.socials}</p>
                    <p><strong>Producto/servicio:</strong> ${emp.product}</p>
                </div>
            `).join("")
            : "<p>No hay emprendimientos registrados todavía.</p>";
    }
}

document.addEventListener("DOMContentLoaded", mostrarDatos);