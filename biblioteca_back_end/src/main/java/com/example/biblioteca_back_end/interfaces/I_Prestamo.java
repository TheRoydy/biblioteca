package com.example.biblioteca_back_end.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.biblioteca_back_end.models.prestamo;

@Repository
public interface I_Prestamo extends CrudRepository <prestamo, String> {
    
    @Query("SELECT pre FROM prestamo pre JOIN "
            + " pre.usuario usua "
            + " JOIN pre.libro li "
            + " WHERE usua.nombre_usuario LIKE %?1% "
            + " OR li.titulo_libro LIKE %?1% "
            + " OR pre.fecha_prestamo= ?1 "
            + " OR pre.fecha_devolucion= ?1 "
            + " OR estado_prestamo LIKE %?1%" )
    List<prestamo>filtroPrestamos (String filtro);

}
