package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Question text is required")
    @Column(nullable = false, unique = true, length = 500)
    private String text;

    @NotBlank(message = "Option A is required")
    @Column(name = "option_a", nullable = false)
    private String optionA;

    @NotBlank(message = "Option B is required")
    @Column(name = "option_b", nullable = false)
    private String optionB;

    @NotBlank(message = "Option C is required")
    @Column(name = "option_c", nullable = false)
    private String optionC;

    @NotBlank(message = "Option D is required")
    @Column(name = "option_d", nullable = false)
    private String optionD;

    @NotBlank(message = "Correct answer is required")
    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;

    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;
}
