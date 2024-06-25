package com.example.biblioteca_back_end.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class libro {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_libro", nullable = false, length = 36, columnDefinition = "char(36)")
    private String id_libro;

    @Column(name = "titulo_libro", nullable = false, length = 100)
    private String titulo_libro;

    @Column(name = "autor_libro", nullable = false, length = 100)
    private String autor_libro;

    @Enumerated(EnumType.STRING)
    @Column(name = "genero_libro", nullable = false, length = 50)
    private genero_libro genero_libro;


    @Column(name = "codigo_ISBN", nullable = false, length = 15)
    private String codigo_ISBN;

    
    @Column(name = "libros_disponible", nullable = false, length = 50) //Esta opción es para la cantidad de libros disponibles
    private String libros_disponibles;

    @Column(name = "libros_ocupados", nullable = false, length = 50) //Esta opcion es para la cantidad de libros que no estaran disponibles
    private String libros_ocupados;

    public enum genero_libro{
        aventura,
        biografia,
        ciencia_ficcion,
        crimen,
        drama,
        ensayo,
        fantasia,
        historico,
        humor,
        infantil,
        juvenil,
        misterio,
        novela,
        poesia,
        romance,
        suspenso,
        terror,
        accion,
        amor,
        cuento,
        fabula,
        filosofico,
        guerra,
        lirico,
        musical,
        periodistico,
        realista;

        public Object toLowerCase() {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'toLowerCase'");
        }

    }

    public libro() {
    }

    public libro(String id_libro, String titulo_libro, String autor_libro, String codigo_ISBN,
            com.example.biblioteca_back_end.models.libro.genero_libro genero_libro, String libros_disponibles,
            String libros_ocupados) {
        this.id_libro = id_libro;
        this.titulo_libro = titulo_libro;
        this.autor_libro = autor_libro;
        this.codigo_ISBN = codigo_ISBN;
        this.genero_libro = genero_libro;
        this.libros_disponibles = libros_disponibles;
        this.libros_ocupados = libros_ocupados;
    }

    public String getId_libro() {
        return id_libro;
    }

    public void setId_libro(String id_libro) {
        this.id_libro = id_libro;
    }

    public String getTitulo_libro() {
        return titulo_libro;
    }

    public void setTitulo_libro(String titulo_libro) {
        this.titulo_libro = titulo_libro;
    }

    public String getAutor_libro() {
        return autor_libro;
    }

    public void setAutor_libro(String autor_libro) {
        this.autor_libro = autor_libro;
    }

    public String getCodigo_ISBN() {
        return codigo_ISBN;
    }

    public void setCodigo_ISBN(String codigo_ISBN) {
        this.codigo_ISBN = codigo_ISBN;
    }

    public genero_libro getGenero_libro() {
        return genero_libro;
    }

    public void setGenero_libro(genero_libro genero_libro) {
        this.genero_libro = genero_libro;
    }

    public String getLibros_disponibles() {
        return libros_disponibles;
    }

    public void setLibros_disponibles(String libros_disponibles) {
        this.libros_disponibles = libros_disponibles;
    }

    public String getLibros_ocupados() {
        return libros_ocupados;
    }

    public void setLibros_ocupados(String libros_ocupados) {
        this.libros_ocupados = libros_ocupados;
    }

    
}
