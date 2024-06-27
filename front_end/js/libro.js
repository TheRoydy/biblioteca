var url = "http://localhost:8080/api/v1/libro/";


/*document.getElementById("titulo_libro").addEventListener("keypress", soloLetras);

//Este campo solo permite letras
const letras_y_caracteresPermitidos = [] 


function soloLetras(event) {
  console.log("Llave presionada. " + event.key);
  console.log("Codigo tecla: "+event.keyCode);
  //se debe ajustar para aceptar mayusculas, minusculas, espacios, ñ
  if (!(letras_y_caracteresPermitidos.includes(event.key))){
    event.preventDefault();
    return;
  }

}*/

function listarLibros() {
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
        //UNA ETIQUETA tr por cada registro
        var trResgistro = document.createElement("tr");

        var celdaID_Libro = document.createElement("td");
        let celdaTitulo = document.createElement("td")
        let celdaAutor = document.createElement("td")
        let celdaGenero = document.createElement("td")
        let celdaISBN = document.createElement("td")
        let celdaLibros_Disponibles = document.createElement("td")
        let celdaLibros_Ocupados = document.createElement("td")
        let celdaAcciones = document.createElement("td")
        celdaAcciones.style.textAlign = "center";

        var headerAcciones = document.getElementById("headerAcciones");
        headerAcciones.style.textAlign = "center";

        //Para traer el modal
        let botonEditarLibro = document.createElement("button");
        botonEditarLibro.value = result[i]["id_libro"];
        botonEditarLibro.innerHTML = "Editar";
        botonEditarLibro.onclick = function (e) {
          $('#EditarModal').modal('show');
          consultarLibroID(this.value);
        }
        botonEditarLibro.className = "btn btn-warning editar_libro";

        let botonEliminar = document.createElement("button");
        botonEliminar.value = result[i]["id_libro"];
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.onclick = function (e) {
          eliminarLibro(this.value);
        }
        botonEliminar.className = "btn btn-danger eliminar";

        let botonDetalleLibro = document.createElement("button");
        botonDetalleLibro.value = result[i]["id_libro"];
        botonDetalleLibro.innerText = "Detalles";
        botonDetalleLibro.className = "btn btn-info detalles_libro";
        botonDetalleLibro.onclick = function (e) {
          $('#ModalDetalleLibro').modal('show');
          detalleLibro(this.value);
        };


        celdaID_Libro.innerText = result[i]["id_libro"];
        celdaTitulo.innerText = result[i]["titulo_libro"];
        celdaAutor.innerText = result[i]["autor_libro"];
        celdaGenero.innerText = result[i]["genero_libro"];
        celdaISBN.innerText = result[i]["codigo_ISBN"];
        celdaLibros_Disponibles.innerText = result[i]["libros_disponibles"];
        celdaLibros_Ocupados.innerText = result[i]["libros_ocupados"];

        celdaAcciones.appendChild(botonEditarLibro);
        celdaAcciones.appendChild(botonEliminar);
        celdaAcciones.appendChild(botonDetalleLibro);

        trResgistro.appendChild(celdaID_Libro);
        trResgistro.appendChild(celdaTitulo);
        trResgistro.appendChild(celdaAutor);
        trResgistro.appendChild(celdaGenero);
        trResgistro.appendChild(celdaISBN);
        trResgistro.appendChild(celdaLibros_Disponibles);
        trResgistro.appendChild(celdaLibros_Ocupados);
        trResgistro.appendChild(celdaAcciones); // Agregar la celda de "Acciones" a la fila

        cuerpoTabla.appendChild(trResgistro);
      }
    },
    error: function (error) {
      alert("Error en la petición " + error);
    }
  });
}

//funcion para traer los datos de libro
function detalleLibro(libro) {
   
  document.getElementById("id_libro").value = libro.id_libro || '';
  document.getElementById("titulo_libro").value = libro.titulo_libro || '';
  document.getElementById("autor_libro").value = libro.autor_libro || '';
  document.getElementById("genero_libro").value = libro.genero-libro || '';
  document.getElementById("codigo_ISBN").value = libro.codigo_ISBN || '';
  document.getElementById("libros_disponibles").value = libro.libros_disponibles || '';
  document.getElementById("libros_ocupados").value = libro.libros_ocupados || '';
}

//funcion para consultar libro
function consultarLibroID(id) {
  //alert(id);
  $.ajax({
    url: url + id,
    type: "GET",
    success: function (result) {
      document.getElementById("id_libro").value = result["id_libro"];
      document.getElementById("titulo_libro").value = result["titulo_libro"];
      document.getElementById("autor_libro").value = result["autor_libro"];
      document.getElementById("genero_libro").value = result["genero_libro"];
      document.getElementById("codigo_ISBN").value = result["codigo_ISBN"];
      document.getElementById("libros_disponibles").value = result["libros_disponibles"];
      document.getElementById("libros_ocupados").value = result["libros_ocupados"];
    }
  });
}

//funcion para poder eliminar un usuario
function eliminarLibro(id) {
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
            "El libro ha sido eliminado correctamente.",
            "success"
          );
          listarLibros(); // Recargar la lista después de eliminar
        },
        error: function (error) {
          Swal.fire("Error", "Error al eliminar el libro, " + error.responseText, "error");
        }
      });
    }
  });
}

//Funcion para poder actualizar el libro
function actualizarLibro() {
  var id_libro = document.getElementById("id_libro").value
  let formData = {
    "titulo_libro": document.getElementById("titulo_libro").value,
    "autor_libro": document.getElementById("autor_libro").value,
    "genero_libro": document.getElementById("genero_libro").value,
    "codigo_ISBN": document.getElementById("codigo_ISBN").value,
    "libros_disponibles": document.getElementById("libros_disponibles").value,
    "libros_ocupados": document.getElementById("libros_ocupados").value
  };

  if (validarCampos()) {
    $.ajax({
      url: url + id_libro,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(formData),


      success: function (result) {

        // Manejar la respuesta exitosa según necesites
        Swal.fire({
          title: "¡Excelente!",
          text: "Se guardó correctamente",
          icon: "success"
        });
        listarLibros(); // Recargar la lista después de eliminar
      },
      error: function (error) {
        // Manejar el error de la petición
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
    var titulo_libro = document.getElementById("titulo_libro").value;
    var autor_libro = document.getElementById("autor_libro").value;
    var genero_libro = document.getElementById("genero_libro").value;
    var codigo_ISBN = document.getElementById("codigo_ISBN").value;
    var libros_disponibles = document.getElementById("libros_disponibles").value;
    var libros_ocupados = document.getElementById("libros_ocupados").value

    // Verificar si algún campo está vacío
    if (titulo_libro === '' || autor_libro === '' || genero_libro === '' || codigo_ISBN === '' || libros_disponibles === '' || libros_ocupados === '') {
      return false; // Al menos un campo está vacío
    } else {
      return true; // Todos los campos están llenos
    }
  }

}

function validarCampos() {
  var titulo_libro = document.getElementById("titulo_libro").value;
  var autor_libro = document.getElementById("autor_libro").value;
  var genero_libro = document.getElementById("genero_libro").value;
  var codigo_ISBN = document.getElementById("codigo_ISBN").value;
  var libros_disponibles = document.getElementById("libros_disponibles").value;
  var libros_ocupados = document.getElementById("libros_ocupados").value;

  var camposValidos = true;

  if (!validarTitulo(titulo_libro)) {
    camposValidos = false;
  }
  if (!validarAutor(autor_libro)) {
    camposValidos = false;
  }
  if (!validarGenero(genero_libro)) {
    camposValidos = false;
  }
  if (!validarISBN(codigo_ISBN)) {
    camposValidos = false;
  }
  if (!validarLibros_Disponibles(libros_disponibles)) {
    camposValidos = false;
  }
  if (!validarLibros_Ocupados(libros_ocupados)) {
    camposValidos = false;

    return camposValidos;
  }
}

function registrarLibro() {
  let formData = {
    "titulo_libro": document.getElementById("titulo_libro").value,
    "autor_libro": document.getElementById("autor_libro").value,
    "genero_libro": document.getElementById("genero_libro").value,
    "codigo_ISBN": document.getElementById("codigo_ISBN").value,
    "libros_disponibles": document.getElementById("libros_disponibles").value,
    "libros_ocupados": document.getElementById("libros_ocupados").value,
  };

  let camposValidos = true;
  let mensajeError = "";

  // Validar cada campo requerido
 
  if (!validarIsbn(document.getElementById("codigo_ISBN"))) {
    camposValidos = false;
    mensajeError += "El código ISBN debe ser un número no negativo y de longitud de 13 caracteres. ";
  }
  if (!validarLi_Disponibles(document.getElementById("libros_disponibles"))) {
    camposValidos = false;
    mensajeError += "El número de libros disponibles debe ser un número no negativo. ";
  }
  if (!validarLi_Ocupados(document.getElementById("libros_ocupados"))) {
    camposValidos = false;
    mensajeError += "El número de libros ocupados debe ser un número no negativo. ";
  }

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
    Swal.fire({
      title: "¡Error!",
      text: mensajeError,
      icon: "error"
    });
  }
}

//validar Titulo
function validarCampos() {
  var titulo_libro = document.getElementById("titulo_libro");
  return validarTitulo(titulo_libro);
}
function validarTitulo(cuadroNumero) {

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

//Validar Autor
function validarCampos() {
  var autor_libro = document.getElementById("autor_libro");
  return validarAutor(autor_libro);
}
function validarAutor(cuadroNumero) {

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

//Validar Genero
function validarCampos() {
  var genero_libro = document.getElementById("genero_libro");
  return validarGenero(genero_libro);
}
function validarGenero(cuadroNumero) {

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

//validar ISBN
function validarIsbn(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;

  // Verificar si es un número, si es negativo o si la longitud no es la adecuada
  if (isNaN(valor) || valor < 0 || valor.length < 13) {
    valido = false;
  }

  if (valido) {
    cuadroNumero.className = "form-control is-valid";
  } else {
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;
}



//validar Libros Disponibles
function validarLi_Disponibles(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;

  // Verificar si es un número y si es negativo
  if (isNaN(valor) || valor < 0 || valor.length < 1 || valor.length > 20) {
    valido = false;
  }

  if (valido) {
    cuadroNumero.className = "form-control is-valid";
  } else {
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;
}


//Validad Libros Ocupados
function validarLi_Ocupados(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;

  // Verificar si es un número y si es negativo
  if (isNaN(valor) || valor < 0 || valor.length < 1 || valor.length > 20) {
    valido = false;
  }

  if (valido) {
    cuadroNumero.className = "form-control is-valid";
  } else {
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;
}



function limpiarFormulario() {
  document.getElementById("titulo_libro").className = "form-control";
  document.getElementById("autor_libro").className = "form-control";
  document.getElementById("genero_libro").className = "form-control";
  document.getElementById("codigo_ISBN").className = "form-control";
  document.getElementById("libros_disponibles").className = "form-control";
  document.getElementById("libros_ocupados").className = "form-control";

  document.getElementById("titulo_libro").value = "";
  document.getElementById("autor_libro").value = "";
  document.getElementById("genero_libro").value = "";
  document.getElementById("codigo_ISBN").value = "";
  document.getElementById("libros_disponibles").value = "";
  document.getElementById("libros_ocupados").value = "";
}
