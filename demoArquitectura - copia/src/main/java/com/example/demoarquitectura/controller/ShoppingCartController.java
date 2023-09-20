package com.example.demoarquitectura.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartItemRepository shoppingCartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/items")
    public List<ShoppingCartItem> getShoppingCartItems() {
        return (List<ShoppingCartItem>) shoppingCartItemRepository.findAll();
    }

    @PostMapping("/add/{productId}")
    public void addToCart(@PathVariable Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID " + productId));

        ShoppingCartItem existingItem = shoppingCartItemRepository.findByProduct(product);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + 1);
        } else {
            ShoppingCartItem newItem = new ShoppingCartItem();
            newItem.setProduct(product);
            newItem.setQuantity(1);
            shoppingCartItemRepository.save(newItem);
        }
    }

    @PostMapping("/remove/{productId}")
    public void removeFromCart(@PathVariable Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID " + productId));

        ShoppingCartItem existingItem = shoppingCartItemRepository.findByProduct(product);

        if (existingItem != null) {
            int newQuantity = existingItem.getQuantity() - 1;
            if (newQuantity > 0) {
                existingItem.setQuantity(newQuantity);
            } else {
                shoppingCartItemRepository.delete(existingItem);
            }
        }
    }
}

