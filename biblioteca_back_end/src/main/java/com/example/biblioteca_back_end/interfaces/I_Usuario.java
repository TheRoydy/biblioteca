package com.example.biblioteca_back_end.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.biblioteca_back_end.models.usuario;

@Repository
public interface I_Usuario extends CrudRepository<usuario, String> {

    @Query("SELECT usua FROM usuario usua WHERE"
    +"usua.nombre_usuario LIKE %?1% OR"
    +"usua.correo_usuario LIKE %?1%")
    List<usuario>filtroUsuarios(String filtros);    

    
}
