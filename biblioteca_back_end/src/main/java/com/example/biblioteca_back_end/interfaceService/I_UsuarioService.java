package com.example.biblioteca_back_end.interfaceService;

import java.util.List;
import java.util.Optional;

import com.example.biblioteca_back_end.models.usuario;

public interface I_UsuarioService {
    public String save(usuario usuario);
    public List<usuario> findAll();
    public List<usuario> filtroUsuarios(String filtro);
    public Optional<usuario> findOne(String id);
    public int delete(String id);
    
}
