package com.example.cardapio.food;


public record FoodResponseDTO(long id, String title, String image, double price ) {
    public FoodResponseDTO(Food food){
        this(food.getId(), food.getTitle(), food.getImage(), food.getPrice());
    }
}
