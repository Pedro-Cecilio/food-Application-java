package com.example.cardapio.food;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record FoodRequestDTO(
        @NotBlank String title,
        @NotBlank String image,
        @NotNull @Positive double price
) {

}
