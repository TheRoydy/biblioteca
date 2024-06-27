package com.example.biblioteca_back_end.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.biblioteca_back_end.interfaceService.I_PrestamoService;
import com.example.biblioteca_back_end.interfaces.I_Prestamo;
import com.example.biblioteca_back_end.models.prestamo;


@Service
public class prestamo_Service implements I_PrestamoService {

    @Autowired
    private I_Prestamo data;

    @Override
    public String save(prestamo prestamo) {
        data.save(prestamo);
        return prestamo.getId_prestamo();
    }

    @Override
    public List<prestamo> findAll(){
        List<prestamo> listaPrestamos=(List<prestamo>) data.findAll();
        return listaPrestamos;
    }

    //Para los filtros
    @Override
    public List<prestamo> filtroPrestamos(String filtro){
        List<prestamo> listaPrestamos=data.filtroPrestamos(filtro);
        return listaPrestamos;
    }

    @Override
    public Optional<prestamo> findOne(String id){
        Optional<prestamo> prestamo=data.findById(id);
        return prestamo;
    }

    @Override
    public int delete(String id){
        data.deleteById(id);
        return 1;
    }
}
