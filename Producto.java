package com.arquitectura.mywebapp.entidad;


import javax.persistence.*;

@Entity
@Table(name = "productos")
public class Producto {

   @Id
   @GeneratedValue( strategy = GenerationType.IDENTITY)
   private long id;

   @Column( name = "nombre", nullable = false, length = 50)
   private String nombre ;

   @Column( name = "descripcion", nullable = false, length = 100)
   private String descripcion ;

   @Column( name = "precio", nullable = false, length = 50)
   private double precio ;

   public Producto(){

   }

   public Producto(long id, String nombre, String descripcion, double precio) {
      this.id = id;
      this.nombre= nombre;
      this.descripcion= descripcion;
      this.precio= precio;

   }

   public long getId() {
      return id;
   }

   public void setId(long id) {
      this.id = id;
   }

   public String getNombre() {
      return nombre;
   }

   public void setNombre(String nombre) {
      this.nombre = nombre;
   }

   public String getDescripcion() {
      return descripcion;
   }

   public void setDescripcion(String descripcion) {
      this.descripcion = descripcion;
   }

   public double getPrecio() {
      return precio;
   }

   public void setPrecio(double precio) {
      this.precio = precio;
   }

   @Override
   public String toString() {
      return "Producto{" +
              "id=" + id +
              ", nombre='" + nombre + '\'' +
              ", descripcion='" + descripcion + '\'' +
              ", precio=" + precio +
              '}';
   }
}
