package com.example.biblioteca_back_end.interfaceService;

import java.util.List;
import java.util.Optional;

import com.example.biblioteca_back_end.models.libro;

public interface I_LibroService {
    public String save(libro libro);
	public List<libro> findAll();
    public List<libro> filtroLibros(String filtro);
	public Optional<libro> findOne(String id);
	public int delete(String id);
}
