package com.example.biblioteca_back_end.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.biblioteca_back_end.interfaceService.I_UsuarioService;
import com.example.biblioteca_back_end.models.usuario;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;




@RequestMapping("api/v1/usuario")
@RestController
@CrossOrigin
public class usuario_Controller {

    @Autowired
    private I_UsuarioService usuario_Service;

    @PostMapping("/")
    public ResponseEntity<Object> save(@RequestBody usuario usuario) {
        //validaciones de usuario
        
        List<usuario> usuario2 = usuario_Service.filtroUsuarios(usuario.getCorreo_usuario());
        if (!usuario2.isEmpty()) {
            return new ResponseEntity<>("El usuario ya existe", HttpStatus.BAD_REQUEST);
        }
        
        if (usuario.getNombre_usuario().equals("")) {
            return new ResponseEntity<>("El nombre es obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (usuario.getDireccion_usuario().equals("")) {
            return new ResponseEntity<>("La direccion es obligatoria", HttpStatus.BAD_REQUEST); 
        }

        if(usuario.getCorreo_usuario().equals("")){
            return new ResponseEntity<>("El correo es obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (usuario.getTipo_usuario().equals("")) {
            return new ResponseEntity<>("El tipo de usuario es obligatorio", HttpStatus.BAD_REQUEST);
        }

        usuario_Service.save(usuario);
        return new ResponseEntity<>(usuario,HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object>findAll() {
        var listaUsuarios=usuario_Service.findAll();
        return new ResponseEntity<>(listaUsuarios,HttpStatus.OK);
    }
    
    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaUsuarios = usuario_Service.filtroUsuarios(filtro);
        return new ResponseEntity<>(listaUsuarios,HttpStatus.OK);
    }

    @GetMapping("/id_usuario")
    public ResponseEntity<Object> findOne(@PathVariable("id_usuario") String id) {
        var usuario = usuario_Service.findOne(id);
        return new ResponseEntity<>(usuario,HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") String id){
        usuario_Service.delete(id);
        return new ResponseEntity<>("Registro Eliminado", HttpStatus.OK);
    }
    
    @PutMapping("/{id_usuario}")
    public ResponseEntity<Object> update(@PathVariable("id_usuario") String id, @RequestBody usuario usuarioUpdate) {
        var usuario = usuario_Service.findOne(id).get();
        if (usuario != null){
            usuario.setNombre_usuario(usuarioUpdate.getNombre_usuario());
            usuario.setDireccion_usuario(usuarioUpdate.getDireccion_usuario());
            usuario.setCorreo_usuario(usuarioUpdate.getCorreo_usuario());
            usuario.setTipo_usuario(usuarioUpdate.getTipo_usuario());

            usuario_Service.save(usuario);
            return new ResponseEntity<>("Guardado", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Error usuario no encontrado", HttpStatus.BAD_REQUEST);
        }
        
    }
}
