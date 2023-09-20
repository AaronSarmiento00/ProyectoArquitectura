package com.example.demoarquitectura.service;

import com.example.demoarquitectura.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAll() {
        return productRepository.getAll();
    }

    public Product getById(Integer id) {
        return productRepository.getById(id);
    }

    public Product save(Product p) {
        return productRepository.save(p);
    }

    public void delete(Integer id) {
        productRepository.delete(id);
    }

    public Product update(Product updatedProduct) {
        return productRepository.update(updatedProduct);
    }

    public List<Product> searchByName(String name) {
        return productRepository.searchByName(name);
    }
}
