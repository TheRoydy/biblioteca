package com.example.biblioteca_back_end.interfaceService;

import java.util.List;
import java.util.Optional;

import com.example.biblioteca_back_end.models.prestamo;

public interface I_PrestamoService {
    public String save(prestamo prestamo);
    public List <prestamo> findAll();
    public List <prestamo> filtroPrestamos(String filtro);
    public Optional <prestamo> findOne (String id);
    public int delete (String id);
}
