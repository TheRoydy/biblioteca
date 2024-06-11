package com.example.biblioteca_back_end.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.biblioteca_back_end.interfaceService.I_LibroService;
import com.example.biblioteca_back_end.interfaces.I_Libro;
import com.example.biblioteca_back_end.models.libro;

@Service
public class libro_Service implements I_LibroService {

    @Autowired
    private I_Libro data;

    @Override
    public String save(libro libro){
        data.save(libro);
        return libro.getId_libro();
    }

    @Override
	public List<libro> findAll() {
		List<libro> listaLibros=(List<libro>) data.findAll();
		
		return listaLibros;
	}
    //Para lo filtros
	
	@Override
	public List<libro> filtroLibros(String filtro) {
		List <libro> listaLibros=data.filtroLibros(filtro);
		return listaLibros;
	}
    

	@Override
	public Optional<libro> findOne(String id) {
		Optional<libro> libro=data.findById(id);
		
		return libro;
	}

	@Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}


    
}
