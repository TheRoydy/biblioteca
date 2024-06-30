package com.example.biblioteca_back_end.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.biblioteca_back_end.interfaceService.I_PrestamoService;
import com.example.biblioteca_back_end.models.prestamo;

import org.springframework.web.bind.annotation.PutMapping;


@RequestMapping("/api/v1/prestamo")
@RestController
@CrossOrigin
public class prestamo_Controller {

    @Autowired
    private I_PrestamoService prestamo_Service;

    @PostMapping("/")
    public ResponseEntity<Object> save(@RequestBody prestamo prestamo) {
        // Validaciones de prestamo

        LocalDate fechaIngreso = LocalDate.parse(prestamo.getFecha_prestamo());
        LocalDate fechaSalida = LocalDate.parse(prestamo.getFecha_devolucion());
        if (fechaSalida.compareTo(fechaIngreso) < 0) {
            return new ResponseEntity<>("La fecha de devolucion no puede ser menor a la fecha", HttpStatus.BAD_REQUEST);

        }

        if (prestamo.getUsuario().equals("")) {
            return new ResponseEntity<>("El usuario no puede estar vacio", HttpStatus.BAD_REQUEST);
        }

        if (prestamo.getLibro().equals("")) {
            return new ResponseEntity<>("El libro no puede estar vacio", HttpStatus.BAD_REQUEST);
        }

        if (prestamo.getFecha_prestamo().equals("")) {
            return new ResponseEntity<>("La fecha de prestamo no puede estar vacia", HttpStatus.BAD_REQUEST);
        }

        if (prestamo.getFecha_devolucion().equals("")) {
            return new ResponseEntity<>("La fehca de devolución no puede estar vacia", HttpStatus.BAD_REQUEST);
        }

        if (prestamo.getEstado_prestamo().equals("")) {
            return new ResponseEntity<>("El estado del prestamo no puede estar vacio", HttpStatus.BAD_REQUEST);
        }
        // Guarda el ingreso

        prestamo_Service.save(prestamo);

        return new ResponseEntity<>(prestamo, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaPrestamos = prestamo_Service.findAll();
        return new ResponseEntity<>(listaPrestamos, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaPrestamos = prestamo_Service.filtroPrestamos(filtro);
        return new ResponseEntity<>(listaPrestamos, HttpStatus.OK);
    }

    @GetMapping("/{id_prestamo}")
    public ResponseEntity<Object> findOne(@PathVariable("id_prestamo") String id) {
        var prestamo = prestamo_Service.findOne(id);
        return new ResponseEntity<>(prestamo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") String id) {
        prestamo_Service.delete(id);
        return new ResponseEntity<>("Registro Eliminado", HttpStatus.OK);
    }  

    @PutMapping("/{id_prestamo}")
    public ResponseEntity<Object> update(@PathVariable ("id_prestamo") String id, @RequestBody prestamo prestamoUpdate) {
        //Verificamos que no hayan campos vacios
        if (prestamoUpdate.contieneCamposVacios()) {
            return new ResponseEntity<>("Todos los campos son obligatorios", HttpStatus.BAD_REQUEST);
        }

        var prestamo = prestamo_Service.findOne(id).get();
        if (prestamo != null){
            LocalDate fechaPrestamo = LocalDate.parse(prestamoUpdate.getFecha_prestamo());
            LocalDate fechaSalida = LocalDate.parse(prestamoUpdate.getFecha_devolucion());
            if (fechaSalida.compareTo(fechaPrestamo) < 0) {
                return new ResponseEntity<>("La fecha de devolucion no puede ser menor a la fecha de prestamo", HttpStatus.BAD_REQUEST);
            }

            prestamo.setUsuario(prestamoUpdate.getUsuario());
            prestamo.setLibro(prestamoUpdate.getLibro());
            prestamo.setFecha_prestamo(prestamoUpdate.getFecha_prestamo());
            prestamo.setFecha_devolucion(prestamoUpdate.getFecha_devolucion());
            prestamo.setEstado_prestamo(prestamoUpdate.getEstado_prestamo());

            prestamo_Service.save(prestamo);
            return new ResponseEntity<>("Guardado", HttpStatus.OK);

        }
        else {
            return new ResponseEntity<>("Error prestamo no encontrado", HttpStatus.BAD_REQUEST);
        }

    }
}