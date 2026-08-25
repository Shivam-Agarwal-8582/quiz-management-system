package com.example.demo.controller;

import com.example.demo.dto.CategorySummary;
import com.example.demo.model.Question;
import com.example.demo.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategorySummary>> getCategorySummaries() {
        return ResponseEntity.ok(questionService.getCategorySummaries());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(questionService.getQuestionsByCategory(category));
    }

    @PostMapping
    public ResponseEntity<Question> addQuestion(@Valid @RequestBody Question question) {
        Question saved = questionService.addQuestion(question);
        return ResponseEntity.created(URI.create("/api/questions/" + saved.getId())).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
