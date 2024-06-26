package com.example.biblioteca_back_end.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.biblioteca_back_end.models.libro;

@Repository
public interface I_Libro extends CrudRepository<libro, String> {
    
    @Query("SELECT li FROM libro li WHERE "
            + "li.titulo_libro LIKE %?1% OR "
			+ "li.autor_libro LIKE %?1% OR "
			+ "li.genero_libro LIKE %?1% OR "
			+ "li.codigo_ISBN LIKE %?1%")
    List<libro>filtroLibros(String filtro); 
}
