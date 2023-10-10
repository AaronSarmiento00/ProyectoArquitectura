package com.example.demoarquitectura.repository;

import com.example.demoarquitectura.entity.ProductHistory;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
public interface ProductHistoryRepository extends CrudRepository<ProductHistory, Long> {
    List<ProductHistory> findAllByProductId(Long productId);
}
