package com.example.demoarquitectura.repository.crud;

import com.example.demoarquitectura.entity.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductCrudRepository extends CrudRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String name);
}
