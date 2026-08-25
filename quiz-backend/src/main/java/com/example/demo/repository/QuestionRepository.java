package com.example.demo.repository;

import com.example.demo.dto.CategorySummary;
import com.example.demo.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByCategoryIgnoreCase(String category);

    @Query("SELECT new com.example.demo.dto.CategorySummary(q.category, COUNT(q)) " +
            "FROM Question q GROUP BY q.category ORDER BY q.category")
    List<CategorySummary> countQuestionsByCategory();
}
