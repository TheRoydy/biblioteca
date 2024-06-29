var url = "http://localhost:8080/api/v1/prestamo/";
var urlUsuario = "http://localhost:8080/api/v1/usuario/";
var urlLibro = "http://localhost:8080/api/v1/libro/";


function listaPrestamos() {
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

                    // Agregar cada celda de la fila con los datos del préstamo
                    var idPrestamo = document.createElement("td");
                    idPrestamo.textContent = prestamo.id_prestamo;
                    fila.appendChild(idPrestamo);

                    var libro = document.createElement("td");
                    libro.textContent = prestamo.libro.titulo;
                    fila.appendChild(libro);

                    var usuario = document.createElement("td");
                    usuario.textContent = prestamo.usuario.nombre;
                    fila.appendChild(usuario);

                    var fechaInicio = document.createElement("td");
                    fechaInicio.textContent = prestamo.fecha_ingreso;
                    fila.appendChild(fechaInicio);

                    var fechaMaxima = document.createElement("td");
                    fechaMaxima.textContent = prestamo.fecha_maxima;
                    fila.appendChild(fechaMaxima);

                    var estado = document.createElement("td");
                    estado.textContent = prestamo.estado; // Agregar el estado del préstamo
                    fila.appendChild(estado);

                    var acciones = document.createElement("td");
                    acciones.innerHTML = '<button class="btn btn-primary btn-sm" onclick="editarPrestamo(\'' + prestamo.id_prestamo + '\')">Editar</button> <button class="btn btn-danger btn-sm" onclick="eliminarPrestamo(\'' + prestamo.id_prestamo + '\')">Eliminar</button>';
                    fila.appendChild(acciones);


                    var botonEliminar = document.createElement("button");
                    botonEliminar.innerText = "Eliminar";
                    botonEliminar.className = "btn btn-danger eliminar";
                    botonEliminar.onclick = function () {
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: "¡No podrás revertir esto!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, eliminarlo'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                eliminarLibro(prestamo.id_prestamo);
                            }
                        });
                    };


                    // Agregar la fila a la tabla
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
// Función para cargar la lista de usuarios
// Función para cargar la lista de usuarios
function cargarListaUsuarios() {
    var usuario = document.getElementById("usuario");

    if (usuario) {
        // Limpiar las opciones actuales
        usuario.innerHTML = "";

        $.ajax({
            url: urlUsuario,
            type: "GET",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var option = document.createElement("option");
                    option.value = result[i].id_usuario;
                    option.text = result[i].nombre + " - " + result[i].correo_electronico;
                    usuario.appendChild(option);
                }
            },
            error: function (error) {
                console.error("Error al obtener la lista de Usuarios: " + error);
            }
        });
    } else {
        console.error("Elemento con ID 'usuario' no encontrado.");
    }
}

// Función para cargar la lista de libros
function cargarListaLibros() {
    var libro = document.getElementById("libro");

    if (libro) {
        // Limpiar las opciones actuales
        libro.innerHTML = "";

        $.ajax({
            url: urlLibro,
            type: "GET",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var option = document.createElement("option");
                    option.value = result[i].id_libro;
                    option.text = result[i].titulo;
                    libro.appendChild(option);
                }
            },
            error: function (error) {
                console.error("Error al obtener la lista de Libros: " + error);
            }
        });
    } else {
        console.error("Elemento con ID 'libro' no encontrado.");
    }
}

function registrarPrestamo() {
    let usuarioId = document.getElementById("usuario").value;
    let libroId = document.getElementById("libro").value;
    let fecha_ingreso = document.getElementById("fecha_ingreso").value;
    let fecha_maxima = document.getElementById("fecha_maxima").value;
    let estado = document.getElementById("estado").value;

    // Agregar console.log para verificar los valores
    console.log("Usuario ID:", usuarioId);
    console.log("Libro ID:", libroId);
    console.log("Fecha Ingreso:", fecha_ingreso);
    console.log("Fecha Maxima:", fecha_maxima);
    console.log("Estado:", estado);

    let prestamoData = {
        "usuario": {
            "id_usuario": usuarioId
        },
        "libro": {
            "id_libro": libroId
        },
        "fecha_ingreso": fecha_ingreso,
        "fecha_maxima": fecha_maxima,
        "estado": estado
    };

    $.ajax({
        url: "http://localhost:8080/api/v1/prestamo/",
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
            // Mostrar mensaje de error detallado
            Swal.fire({
                title: "Error",
                text: "Error al registrar el préstamo: " + error.responseText,
                icon: "error"
            });
        }
    });
}

function limpiarFormulario() {
    document.getElementById("usuario").value = "";
    document.getElementById("libro").value = "";
    document.getElementById("fecha_ingreso").value = "";
    document.getElementById("fecha_maxima").value = "";
    document.getElementById("estado").value = "";
}



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
                    listaPrestamo(); // Refresh the loan list after deletion
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