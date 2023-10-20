package com.example.cardapio.controllers;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cardapio.food.Food;
import com.example.cardapio.food.FoodRepository;
import com.example.cardapio.food.FoodRequestDTO;
import com.example.cardapio.food.FoodResponseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/food")
public class FoodController {
    @Autowired
    private FoodRepository foodRepository;

    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<List<FoodResponseDTO>> getAll() {
        List<FoodResponseDTO> foodList = this.foodRepository.findAll().stream().map(FoodResponseDTO::new).toList();
        return ResponseEntity.status(HttpStatus.OK).body(foodList);
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    public ResponseEntity<Object> creteFood(@RequestBody @Valid FoodRequestDTO data) {
        Food food = new Food();
        BeanUtils.copyProperties(data, food);
        this.foodRepository.save(food);

        return ResponseEntity.status(HttpStatus.CREATED).body("successfully created food");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateFood(@PathVariable long id, @RequestBody @Valid FoodRequestDTO data) {
        var food = this.foodRepository.findById(id);
        if (food != null) {
            BeanUtils.copyProperties(data, food.get());
            this.foodRepository.save(food.get());
        } else {
            throw new IllegalArgumentException("food not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body("updated food");
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFood(@PathVariable long id) {

        this.foodRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("deleted food");
    }
}
