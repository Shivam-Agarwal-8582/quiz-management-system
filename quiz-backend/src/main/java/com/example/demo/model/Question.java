package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @jakarta.persistence.Column(name = "option_a")
    private String optionA;

    @jakarta.persistence.Column(name = "option_b")
    private String optionB;

    @jakarta.persistence.Column(name = "option_c")
    private String optionC;

    @jakarta.persistence.Column(name = "option_d")
    private String optionD;

    @jakarta.persistence.Column(name = "correct_answer")
    private String correctAnswer;
}
