package com.example.biblioteca_back_end.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class prestamo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_prestamo", nullable=false, length=36)
    private String id_prestamo;

    @ManyToOne
    @JoinColumn (name = "id_libro")
    private libro libro;

    @ManyToOne
    @JoinColumn (name = "id_usuario")
    private usuario usuario;

    @Column(name = "fecha_prestamo", nullable = false, length = 36)
    private String fecha_prestamo;

    @Column(name = "fecha_devolucion", nullable = false, length = 36)
    private String fecha_devolucion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_prestamo", nullable = false, length = 15)
    private estado_prestamo estado_prestamo;

   
    public enum estado_prestamo{
        prestamo,
        entregado,
        cancelado;
    }

    public prestamo() {
    }

    public prestamo(String id_prestamo, com.example.biblioteca_back_end.models.libro libro,
            com.example.biblioteca_back_end.models.usuario usuario, String fecha_prestamo, String fecha_devolucion,
            com.example.biblioteca_back_end.models.prestamo.estado_prestamo estado_prestamo) {
        this.id_prestamo = id_prestamo;
        this.libro = libro;
        this.usuario = usuario;
        this.fecha_prestamo = fecha_prestamo;
        this.fecha_devolucion = fecha_devolucion;
        this.estado_prestamo = estado_prestamo;
    }

    public String getId_prestamo() {
        return id_prestamo;
    }

    public void setId_prestamo(String id_prestamo) {
        this.id_prestamo = id_prestamo;
    }

    public libro getLibro() {
        return libro;
    }

    public void setLibro(libro libro) {
        this.libro = libro;
    }

    public usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(usuario usuario) {
        this.usuario = usuario;
    }

    public String getFecha_prestamo() {
        return fecha_prestamo;
    }

    public void setFecha_prestamo(String fecha_prestamo) {
        this.fecha_prestamo = fecha_prestamo;
    }

    public String getFecha_devolucion() {
        return fecha_devolucion;
    }

    public void setFecha_devolucion(String fecha_devolucion) {
        this.fecha_devolucion = fecha_devolucion;
    }

    public estado_prestamo getEstado_prestamo() {
        return estado_prestamo;
    }

    public void setEstado_prestamo(estado_prestamo estado_prestamo) {
        this.estado_prestamo = estado_prestamo;
    }

    public boolean contieneCamposVacios(){
        return false;
    }
}
