package com.example.demoarquitectura.repository;

import com.example.demoarquitectura.entity.Product;
import com.example.demoarquitectura.repository.crud.ProductCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepository {

    @Autowired
    private ProductCrudRepository productCrudRepository;

    public List<Product> getAll() {
        return (List<Product>) productCrudRepository.findAll();
    }

    public Product getById(Integer id) {
        return productCrudRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado con el ID" + id));
    }

    public Product save(Product p) {
        return productCrudRepository.save(p);
    }

    public void delete(Integer id) {
        productCrudRepository.deleteById(id);
    }

    public Product update(Product updatedProduct) {
        // Verifica si el producto con el ID proporcionado existe en la base de datos
        Product existingProduct = productCrudRepository.findById(updatedProduct.getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con el ID " + updatedProduct.getId()));

        // Actualiza los campos del producto existente con la información del producto actualizado
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());

        // Guarda y devuelve el producto actualizado
        return productCrudRepository.save(existingProduct);
    }


    public List<Product> searchByName(String name) {
        return productCrudRepository.findByNameContainingIgnoreCase(name);
    }
}
