package com.example.biblioteca_back_end.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.biblioteca_back_end.interfaceService.I_UsuarioService;
import com.example.biblioteca_back_end.interfaces.I_Usuario;
import com.example.biblioteca_back_end.models.usuario;

@Service
public class usuario_Service implements I_UsuarioService {

    @Autowired
    private I_Usuario data;

    @Override
    public String save(usuario usuario){
        data.save(usuario);
        return usuario.getId_usuario();
    }

    @Override
    public List<usuario> findAll(){
        List<usuario> listaUsuarios=(List<usuario>) data.findAll();
        return listaUsuarios;
    }

    //para los filtros de usuario
    @Override
    public List<usuario> filtroUsuarios(String filtro){
        List<usuario> listaUsuarios=data.filtroUsuarios(filtro);
        return listaUsuarios;
    }

    @Override
    public Optional<usuario> findOne(String id){
        Optional<usuario> usuario=data.findById(id);
        return usuario;
    }

    @Override
    public int delete(String id){
        data.deleteById(id);
        return 1;
    }
    
}
