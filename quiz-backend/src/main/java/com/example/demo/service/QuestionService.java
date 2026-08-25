package com.example.demo.service;

import com.example.demo.dto.CategorySummary;
import com.example.demo.model.Question;
import com.example.demo.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> getQuestionsByCategory(String category) {
        return questionRepository.findByCategoryIgnoreCase(category);
    }

    public List<CategorySummary> getCategorySummaries() {
        return questionRepository.countQuestionsByCategory();
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new IllegalArgumentException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }
}
