var url = "http://localhost:8080/api/v1/usuario/";

//Designamos a que campo queremos que vayan los ciertos caracteres
document.getElementById("nombre_usuario").addEventListener("keypress",soloLetras);
document.getElementById("direccion_usuario").addEventListener("keypress",soloLetras);
document.getElementById("correo_usuario").addEventListener("keypress",soloLetrasCorreo);

function soloLetras(event){
  console.log("Llave presionada: "+event.key);
  console.log("Código tecla: "+event.keyCode);
  
  const letrasPermitidas=[
    //letras en minúsculas
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
    //LETRAS EN MAYÚSCULAS
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
    //letras con tildes, mayusculas y minusculas
    "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú"

  ];
  const numeroPermitidos=[
    '1', '2', '3','4','5','6','7','8','9','0'
  ];
  const caracteresPermitidos=[
    '@','_','-','.'
  ];


  if (!(letrasPermitidas.includes(event.key))){
    event.preventDefault();
    return;
  }
}

function soloLetrasCorreo(event){
    console.log("Llave presionada: "+event.key);
    console.log("Código tecla: "+event.keyCode);
    
    const letrasPermitidas=[
      //letras en minúsculas
      "a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","o","z","ñ","Ñ",
      //LETRAS EN MAYÚSCULAS
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ",
      //letras con tildes, mayusculas y minusculas
      "á",  "é",  "í",  "ó",  "ú",  "Á",  "É",  "Í",  "Ó",  "Ú",
      //numeros permitidos para el correo
      '1', '2', '3','4','5','6','7','8','9','0',
      //caracteres permitidos para el correo
      '@','_','-','.'
        
    ];
    if (!(letrasPermitidas.includes(event.key))){
      event.preventDefault();
      return;
    }
  }

//funcion para listar ls usuarios
function listarUsuarios() {
    //METODO PARA LISTAR LOS CLIENTES
    //SE CREA LA PETICION AJAX
    var capturarFiltro = document.getElementById("inputSearch").value;
    var urlLocal = url;
    if (capturarFiltro != "") {
        urlLocal += "busquedafiltro/" + capturarFiltro;
    }
    $.ajax({
        url: urlLocal,
        type: "GET",
        success: function (result) {
            //success: funcion que se ejecuta
            //cuando la peticion tiene exito
            console.log(result);

            var cuerpoTabla = document.getElementById("cuerpoTabla");
            //Se limpia el cuepro de la tabla
            cuerpoTabla.innerHTML = "";
            //se hace un ciclo que recorra l arreglo con los datos
            for (var i = 0; i < result.length; i++) {

                var trResgistro = document.createElement("tr");

                var celdaID_Usuario = document.createElement("td");
                let celdaNombre = document.createElement("td")
                let celdaDireccion = document.createElement("td")
                let celdaCorreo = document.createElement("td")
                let celdaTipo_Usuario = document.createElement("td")
                let celdaAcciones = document.createElement("td")
                celdaAcciones.style.textAlign = "center";

                var headerAcciones = document.getElementById("headerAcciones");
                headerAcciones.style.textAlign = "center";

                //Para traer el modal para editar la info del usuario
                let botonEditarUsuario = document.createElement("button");
                botonEditarUsuario.value = result[i]["id_usuario"];
                botonEditarUsuario.innerHTML = "Editar";
                botonEditarUsuario.onclick = function (e) {
                    $('#EditarModal').modal('show');
                    consultarUsuarioID(this.value);
                }
                botonEditarUsuario.className = "btn btn-warning editar_usuario";


                let botonEliminar = document.createElement("button");
                botonEliminar.value = result[i]["id_usuario"];
                botonEliminar.innerHTML = "Eliminar";
                botonEliminar.onclick = function (e) {
                    eliminarUsuario(this.value);
                }
                botonEliminar.className = "btn btn-danger eliminar";

                celdaID_Usuario.innerText = result[i]["id_usuario"];
                celdaNombre.innerText = result[i]["nombre_usuario"];
                celdaDireccion.innerText = result[i]["direccion_usuario"];
                celdaCorreo.innerText = result[i]["correo_usuario"];
                celdaTipo_Usuario.innerText = result[i]["tipo_usuario"];

                celdaAcciones.appendChild(botonEditarUsuario);
                celdaAcciones.appendChild(botonEliminar);
                //celdaAcciones.appendChild(botonDetalles);

                trResgistro.appendChild(celdaID_Usuario);
                trResgistro.appendChild(celdaNombre);
                trResgistro.appendChild(celdaDireccion);
                trResgistro.appendChild(celdaCorreo);
                trResgistro.appendChild(celdaTipo_Usuario);
                trResgistro.appendChild(celdaAcciones); // Agregar la celda de "Acciones" a la fila

                cuerpoTabla.appendChild(trResgistro);
            }
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    });
}

//funcion para consultar libro
function consultarUsuarioID(id) {
    //alert(id);
    $.ajax({
        url: url + id,
        type: "GET",
        success: function (result) {
            document.getElementById("id_usuario").value = result["id_usuario"];
            document.getElementById("nombre_usuario").value = result["nombre_usuario"];
            document.getElementById("direccion_usuario").value = result["direccion_usuario"];
            document.getElementById("correo_usuario").value = result["correo_usuario"];
            document.getElementById("tipo_usuario").value = result["tipo_usuario"];
        }
    });
}

//funcion para poder eliminar un usuario
function eliminarUsuario(id) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Seguro que quieres eliminar esto, una vez eliminado no se podra recuperar este registro!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + id,
                type: "DELETE",
                success: function (result) {
                    Swal.fire(
                        "¡Eliminado!",
                        "El Usuario ha sido eliminado correctamente.",
                        "success"
                    );
                    listarUsuarios(); // Recargar la lista después de eliminar
                },
                error: function (error) {
                    Swal.fire("Error", "Error al eliminar el usuario, " + error.responseText, "error");
                }
            });
        }
    });
}

//Funcion para poder actualizar el libro
function actualizarUsuario() {
    var id_usuario = document.getElementById("id_usuario").value
    let formData = {
        "nombre_usuario": document.getElementById("nombre_usuario").value,
        "direccion_usuario": document.getElementById("direccion_usuario").value,
        "correo_usuario": document.getElementById("correo_usuario").value,
        "tipo_usuario": document.getElementById("tipo_usuario").value,
    };

    if (validarCampos()) {
        $.ajax({
            url: url + id_usuario,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(formData),


            success: function (result) {
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
                listarUsuarios(); // Recargar la lista automaticamente despues de eliminar un usuario
            },
            error: function (error) {
                Swal.fire({
                    title: "¡Error!",
                    text: "No se guardó",
                    icon: "error"
                });
            },
            error: function (error) {
                Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
            }
        });
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
    function validarCampos() {
        // Obtener los valores de los campos
        var nombre_usuario = document.getElementById("nombre_usuario").value;
        var direccion_usuario = document.getElementById("direccion_usuario").value;
        var correo_usuario = document.getElementById("correo_usuario").value;
        var tipo_usuario = document.getElementById("tipo_usuario").value;

        // Verificar si algún campo está vacío
        if (nombre_usuario === '' || direccion_usuario === '' || correo_usuario === '' || tipo_usuario === '') {
            return false; // Al menos un campo está vacío
        } else {
            return true; // Todos los campos están llenos
        }
    }

}

//Funcion para validar los campos
function validarCampos() {
    var nombre_usuario = document.getElementById("nombre_usuario").value;
    var direccion_usuario = document.getElementById("direccion_usuario").value;
    var correo_usuario = document.getElementById("correo_usuario").value;
    var tipo_usuario = document.getElementById("tipo_usuario").value;

    var camposValidos = true;

    if (!validarNombre(nombre_usuario)) {
        camposValidos = false;
    }
    if (!validarDireccion(direccion_usuario)) {
        camposValidos = false;
    }
    if (!validarCorreo(correo_usuario)) {
        camposValidos = false;
    }
    if (!validarTipo_Usuario(tipo_usuario)) {
        camposValidos = false;

        return camposValidos;
    }
}

//funcion para registrar a los usuarios
function registrarUsuario() {

    let formData = {
        "nombre_usuario": document.getElementById("nombre_usuario").value,
        "direccion_usuario": document.getElementById("direccion_usuario").value,
        "correo_usuario": document.getElementById("correo_usuario").value,
        "tipo_usuario": document.getElementById("tipo_usuario").value,
    };

    let camposValidos = true;
    let camposRequeridos = [
        "nombre_usuario",
        "direccion_usuario",
        "correo_usuario",
        "tipo_usuario",


    ];
    if (!validarCorreo(correo_usuario)) {
        camposValidos = false;
    }

    camposRequeridos.forEach(function (campo) {
        let valorCampo = document.getElementById(campo).value.trim();
        if (valorCampo === "") {
            camposValidos = false;
            return false; // Terminar la iteración si se encuentra un campo vacío
        }
    });

    if (camposValidos) {
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (result) {
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
                limpiarFormulario();
            },
            error: function (error) {
                Swal.fire("Error", "Error al guardar, " + error.responseText, "error");
            },
        });
    } else {
        // Mostrar mensaje genérico si otros campos no están llenos correctamente
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}


//validar nombre
function validarCampos() {
    var nombre_usuario = document.getElementById("nombre_usuario");
    return validarNombre(nombre_usuario);
}
function validarNombre(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 1 || valor.length > 100) {
        valido = false
    }

    if (valido) {
        //cuadro de texto cumple
        cuadroNumero.className = "form-control is-valid";
    } else {
        //cuadro de texto no cumple
        cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
}

//Validar direccion
function validarCampos() {
    var direccion_usuario = document.getElementById("direccion_usuario");
    return validarDireccion(direccion_usuario);
}
function validarDireccion(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 1 || valor.length > 11) {
        valido = false
    }

    if (valido) {
        //cuadro de texto cumple
        cuadroNumero.className = "form-control is-valid";
    } else {
        //cuadro de texto no cumple
        cuadroNumero.className = "form-control is-invalid";
    }
    return valido;

}

//Validar Correo
function validarCampos() {
    var correo_usuario = document.getElementById("correo_usuario");
    return validarCorreo(correo_usuario);
}
function validarCorreo(cuadroNumero) {
    var valor = cuadroNumero.value;
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var valido = regex.test(valor);

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
}


//validar el tipo de usuario
function validarCampos() {
    var tipo_usuario = document.getElementById("tipo_usuario");
    return validarTipo_Usuario(tipo_usuario);
}
function validarTipo_Usuario(cuadroNumero) {

    var valor = cuadroNumero.value;
    var valido = true;
    if (valor.length < 1 || valor.length > 20) {
        valido = false
    }

    if (valido) {
        //cuadro de texto cumple
        cuadroNumero.className = "form-control is-valid";
    } else {
        //cuadro de texto no cumple
        cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
}

//funcion para limpiar el formulario de registro
function limpiarFormulario() {
    document.getElementById("nombre_usuario").className = "form-control";
    document.getElementById("direccion_usuario").className = "form-control";
    document.getElementById("correo_usuario").className = "form-control";
    document.getElementById("tipo_usuario").className = "form-control";

    document.getElementById("nombre_usuario").value = "";
    document.getElementById("direccion_usuario").value = "";
    document.getElementById("correo_usuario").value = "";
    document.getElementById("tipo_usuario").value = "";
}