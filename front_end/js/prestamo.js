var url = "http://localhost:8080/api/v1/prestamo/";
var urlUsuario = "http://localhost:8080/api/v1/usuario/";
var urlLibro = "http://localhost:8080/api/v1/libro/";

// Función para listar los préstamos realizados
function listarPrestamos() {
    $(document).ready(function () {
        $.ajax({
            url: url,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");

                // Limpiar el cuerpo de la tabla antes de agregar nuevos datos
                cuerpoTabla.innerHTML = "";

                // Iterar sobre cada préstamo y agregar una fila a la tabla
                result.forEach(function (prestamo) {
                    var fila = document.createElement("tr");

                    var id_prestamo = document.createElement("td");
                    id_prestamo.textContent = prestamo.id_prestamo;
                    fila.appendChild(id_prestamo);

                    var fecha_prestamo = document.createElement("td");
                    fecha_prestamo.textContent = prestamo.fecha_prestamo;
                    fila.appendChild(fecha_prestamo);

                    var fecha_devolucion = document.createElement("td");
                    fecha_devolucion.textContent = prestamo.fecha_devolucion;
                    fila.appendChild(fecha_devolucion);

                    var usuario = document.createElement("td");
                    usuario.textContent = prestamo.usuario.nombre_usuario;
                    fila.appendChild(usuario);

                    var libro = document.createElement("td");
                    libro.textContent = prestamo.libro.titulo_libro;
                    fila.appendChild(libro);

                    var estado_prestamo = document.createElement("td");
                    estado_prestamo.textContent = prestamo.estado_prestamo;
                    fila.appendChild(estado_prestamo);

                    var acciones = document.createElement("td");
                    acciones.innerHTML = `
                        <button class="btn btn-warning btn-sm" onclick="editarPrestamo('${prestamo.id_prestamo}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarPrestamo('${prestamo.id_prestamo}')">Eliminar</button>
                    `;
                    fila.appendChild(acciones);

                    cuerpoTabla.appendChild(fila);
                });
            },
            error: function (error) {
                console.error("Error al obtener la lista de Préstamos: " + error);
            }
        });
    });
}

// Función para cargar la lista de usuarios
function cargarListaUsuarios() {
    var usuarioSelect = document.getElementById("usuario_prestamo");

    if (usuarioSelect) {
        usuarioSelect.innerHTML = "";

        $.ajax({
            url: urlUsuario,
            type: "GET",
            success: function (result) {
                result.forEach(function (usuario) {
                    var option = document.createElement("option");
                    option.value = usuario.id_usuario;
                    option.text = `${usuario.nombre_usuario} - ${usuario.correo_usuario}`;
                    usuarioSelect.appendChild(option);
                });
            },
            error: function (error) {
                console.error("Error al obtener la lista de Usuarios: " + error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo cargar la lista de usuarios.",
                    icon: "error"
                });
            }
        });
    } else {
        console.error("Elemento con ID 'usuario_prestamo' no encontrado.");
    }
}



// Función para cargar la lista de libros
function cargarListaLibros() {
    var libroSelect = document.getElementById("libro_prestamo");

    if (libroSelect) {
        libroSelect.innerHTML = "";

        $.ajax({
            url: urlLibro,
            type: "GET",
            success: function (result) {
                result.forEach(function (libro) {
                    var option = document.createElement("option");
                    option.value = libro.id_libro;
                    option.text = libro.titulo_libro;
                    libroSelect.appendChild(option);
                });
            },
            error: function (error) {
                console.error("Error al obtener la lista de Libros: " + error);
            }
        });
    } else {
        console.error("Elemento con ID 'libro_prestamo' no encontrado.");
    }
}

// Función para registrar un préstamo
function registrarPrestamo() {
    let fechaPrestamo = document.getElementById("fecha_prestamo").value;
    let fechaDevolucion = document.getElementById("fecha_devolucion").value;
    let idUsuario = document.getElementById("usuario_prestamo").value;
    let idLibro = document.getElementById("libro_prestamo").value;
    let estadoPrestamo = document.getElementById("estado_prestamo").value;

    // Formatear las fechas en el formato esperado (yyyy-MM-dd)
    fechaPrestamo = formatDate(fechaPrestamo);
    fechaDevolucion = formatDate(fechaDevolucion);

    let prestamoData = {
        "usuario": {
            "id_usuario": idUsuario
        },
        "libro": {
            "id_libro": idLibro
        },
        "fecha_prestamo": fechaPrestamo,
        "fecha_devolucion": fechaDevolucion,
        "estado_prestamo": estadoPrestamo
    };

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(prestamoData),
        success: function (result) {
            Swal.fire({
                title: "¡Excelente!",
                text: "Préstamo registrado correctamente",
                icon: "success"
            });
            limpiarFormulario();
        },
        error: function (error) {
            console.error("Error al registrar el préstamo:", error);
            Swal.fire({
                title: "Error",
                text: "Error al registrar el préstamo: " + error.responseText,
                icon: "error"
            });
        }
    });
}

function formatDate(dateString) {
    let [year, month, day] = dateString.split("-");
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Función para eliminar un préstamo
function eliminarPrestamo(idPrestamo) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + idPrestamo,
                type: "DELETE",
                success: function (result) {
                    listarPrestamos();
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El préstamo ha sido eliminado correctamente.",
                        icon: "success"
                    });
                },
                error: function (error) {
                    console.error("Error en la petición de eliminación:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al eliminar el préstamo. Por favor, inténtelo de nuevo.",
                        icon: "error"
                    });
                }
            });
        }
    });
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("fecha_prestamo").className = "form-control";
    document.getElementById("fecha_devolucion").className = "form-control";
    document.getElementById("usuario_prestamo").className = "form-control";
    document.getElementById("libro_prestamo").className = "form-control";
    document.getElementById("estado_prestamo").className = "form-control";

    document.getElementById("fecha_prestamo").value = "";
    document.getElementById("fecha_devolucion").value = "";
    document.getElementById("usuario_prestamo").value = "";
    document.getElementById("libro_prestamo").value = "";
    document.getElementById("estado_prestamo").value = "";
}

// Cargar las listas de usuarios y libros al cargar la página
$(document).ready(function () {
    cargarListaUsuarios();
    cargarListaLibros();
});
