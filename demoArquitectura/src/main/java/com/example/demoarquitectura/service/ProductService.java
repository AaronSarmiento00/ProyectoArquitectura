package com.example.demoarquitectura.service;

import com.example.demoarquitectura.entity.Product;
import com.example.demoarquitectura.repository.ProductRepository;
import com.example.demoarquitectura.repository.ProductHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demoarquitectura.entity.ProductHistory;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductHistoryRepository productHistoryRepository;

    public List<Product> getAll() {
        return productRepository.getAll();
    }

    public Product getById(Integer id) {
        return productRepository.getById(id);
    }

    public Product save(Product p) {
        Product savedProduct = productRepository.save(p);

        // Registrar la acción en el historial
        logProductAction(savedProduct.getId().longValue(), "Producto creado");

        return savedProduct;
    }

    public void delete(Integer id) {
        productRepository.delete(id);

        // Registrar la acción en el historial
        logProductAction(id.longValue(), "Producto eliminado");
    }

    public Product update(Product updatedProduct) {
        Product existingProduct = productRepository.update(updatedProduct);

        // Registrar la acción en el historial
        logProductAction(existingProduct.getId().longValue(), "Producto actualizado");

        return existingProduct;
    }

    public List<Product> searchByName(String name) {
        return productRepository.searchByName(name);
    }

    private void logProductAction(Long productId, String action) {
        ProductHistory historyEntry = new ProductHistory();
        historyEntry.setProductId(productId);
        historyEntry.setAction(action);
        historyEntry.setTimestamp(LocalDateTime.now());

        productHistoryRepository.save(historyEntry);
    }
}
