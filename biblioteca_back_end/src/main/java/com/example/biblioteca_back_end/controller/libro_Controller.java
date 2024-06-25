package com.example.biblioteca_back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.biblioteca_back_end.interfaceService.I_LibroService;
import com.example.biblioteca_back_end.models.libro;

@RequestMapping("api/v1/libro")
@RestController
@CrossOrigin
public class libro_Controller {

     @Autowired
	private I_LibroService libro_Service;
	
	@PostMapping("/")
	public ResponseEntity<Object> save(@RequestBody libro libro) {
	    
	    List<libro> libro2 = libro_Service.filtroLibros(libro.getCodigo_ISBN());
	    if (!libro2.isEmpty()) {
	        return new ResponseEntity<>("El libro ya esta registrado", HttpStatus.BAD_REQUEST);
	    }
	    
	    if (libro.getTitulo_libro().equals("")) {

            return new ResponseEntity<>("El titulo es obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (libro.getAutor_libro().equals("")) {

            return new ResponseEntity<>("El autor es obligatorio", HttpStatus.BAD_REQUEST);
        }
        if (libro.getCodigo_ISBN().equals("")) {

            return new ResponseEntity<>("El codigo ISNB del libro es obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (libro.getGenero_libro().equals("")) {

            return new ResponseEntity<>("El genero del libro es obligatorio", HttpStatus.BAD_REQUEST);
        }

		if (libro.getLibros_disponibles().equals("")) {

            return new ResponseEntity<>("El numero de libros disponibles es obligatorio", HttpStatus.BAD_REQUEST);
        }

		if (libro.getLibros_ocupados().equals("")) {

            return new ResponseEntity<>("El numero de libros ocupados es obligatorio", HttpStatus.BAD_REQUEST);
        }

		libro_Service.save(libro);
		return new ResponseEntity<>(libro,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var listaLibros=libro_Service.findAll();
		return new ResponseEntity<>(listaLibros,HttpStatus.OK);
	}
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object>findFiltro(@PathVariable String filtro){
		var listaLibros = libro_Service.filtroLibros(filtro);
		return new ResponseEntity<>(listaLibros, HttpStatus.OK);
	}
	
	
	@GetMapping("/{id_libro}")
	public ResponseEntity<Object> findOne(@PathVariable("id_libro") String id){
		var libro=libro_Service.findOne(id);
		return new ResponseEntity<>(libro,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") String id){
		libro_Service.delete(id);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
    
    @PutMapping("/{id_libro}")
	public ResponseEntity<Object> update(@PathVariable("id_libro") String id, @RequestBody libro  libroUpdate){
		var libro= libro_Service.findOne(id).get();
		if (libro != null) {
			libro.setTitulo_libro(libroUpdate.getTitulo_libro());
			libro.setAutor_libro(libroUpdate.getAutor_libro());
            libro.setCodigo_ISBN(libroUpdate.getCodigo_ISBN());
            libro.setGenero_libro(libroUpdate.getGenero_libro());
            libro.setLibros_disponibles(libroUpdate.getLibros_disponibles());
            libro.setLibros_ocupados(libroUpdate.getLibros_ocupados());
			
			libro_Service.save(libro);
			return new ResponseEntity<>("Guardado",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Error libro no encontrado",HttpStatus.BAD_REQUEST);
		}
		
	}
}
