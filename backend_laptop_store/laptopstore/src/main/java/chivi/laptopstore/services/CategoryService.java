package chivi.laptopstore.services;

import chivi.laptopstore.communication.request.CategoryRequest;
import chivi.laptopstore.models.entities.CategoryModel;
import chivi.laptopstore.repositories.entities.ICategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final ICategoryRepository categoryRepository;

    public List<CategoryModel> findAllCategory() {
        return categoryRepository.findAll();
    }

    public CategoryModel createCategory(CategoryRequest categoryRequest) {
        return categoryRepository.save(CategoryModel
                .builder()
                .name(categoryRequest.getName())
                .url(categoryRequest.getUrl())
                .build());
    }

    public CategoryModel editCategory(Long categoryID, CategoryRequest categoryRequest) {
        Optional<CategoryModel> optional = categoryRepository.findById(categoryID);

        if (optional.isEmpty()) {
            return CategoryModel.builder().build();
        }

        optional.get().setName(categoryRequest.getName());
        optional.get().setUrl(categoryRequest.getUrl());
        return categoryRepository.save(optional.get());
    }
}
