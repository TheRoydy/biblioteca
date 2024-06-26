package com.example.biblioteca_back_end.models;


import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_usuario", nullable = false, length = 36, columnDefinition = "char(36)")
    private String id_usuario;
    
    @Column(name = "nombre_usuario", nullable = false, length = 100)
    private String nombre_usuario;

    @Column(name = "direcccion_usuario", nullable = false, length = 100)
    private String direccion_usuario;

    @Column(name = "correo_usuario", nullable = false, length = 100)
    private String correo_usuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario", nullable = false, length = 30)
    private String tipo_usuario;

    public enum tipo_usuario{
        lector,
        bibliotecario,
        administrador;
    }

    public usuario() {
    }

    public usuario(String id_usuario, String nombre_usuario, String direccion_usuario, String correo_usuario,
            String tipo_usuario) {
        this.id_usuario = id_usuario;
        this.nombre_usuario = nombre_usuario;
        this.direccion_usuario = direccion_usuario;
        this.correo_usuario = correo_usuario;
        this.tipo_usuario = tipo_usuario;
    }

    public String getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(String id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public String getDireccion_usuario() {
        return direccion_usuario;
    }

    public void setDireccion_usuario(String direccion_usuario) {
        this.direccion_usuario = direccion_usuario;
    }

    public String getCorreo_usuario() {
        return correo_usuario;
    }

    public void setCorreo_usuario(String correo_usuario) {
        this.correo_usuario = correo_usuario;
    }

    public String getTipo_usuario() {
        return tipo_usuario;
    }

    public void setTipo_usuario(String tipo_usuario) {
        this.tipo_usuario = tipo_usuario;
    }

}
