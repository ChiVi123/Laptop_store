package chivi.laptopstore.services;

import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.CustomNotFoundException;
import chivi.laptopstore.models.entities.CategoryInfo;
import chivi.laptopstore.models.entities.CategoryNode;
import chivi.laptopstore.models.requests.CategoryRequest;
import chivi.laptopstore.repositories.ICategoryInfoRepository;
import chivi.laptopstore.repositories.ICategoryNodeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Slf4j
@Service
@AllArgsConstructor
public class CategoryService {
    private final ICategoryInfoRepository categoryInfoRepository;
    private final ICategoryNodeRepository categoryNodeRepository;

    public CategoryNode getRoot() {
        return categoryNodeRepository
                .findByParent_Id(null)
                .orElseThrow(() -> new BaseException(HttpStatus.NOT_FOUND.value(), "root not found"));
    }

    public Set<CategoryInfo> getAllByIds(List<Long> ids) {
        return categoryInfoRepository.findAllByIdIn(ids);
    }

    public CategoryNode getNodeById(Long id) {
        return categoryNodeRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("node category", id));
    }

    public CategoryInfo getInfoById(Long id) {
        return categoryInfoRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("category", id));
    }

    public void checkConflictByName(String name) {
        if (categoryInfoRepository.existsByName(name)) {
            throw new ConflictException("Category", name);
        }
    }

    public CategoryNode create(CategoryNode parent, CategoryRequest request) {
        CategoryInfo categoryInfo = new CategoryInfo();
        CategoryNode node = new CategoryNode();

        categoryInfo.setName(request.getName());
        categoryInfo.setPath(request.getPath());
        categoryInfo.setCode(parent.getInfo().getCode() + "-" + parent.getInfo().getId());
        categoryInfo.setStatus(request.getStatus());

        CategoryInfo resultCategoryInfo = categoryInfoRepository.save(categoryInfo);

        node.setInfo(resultCategoryInfo);
        parent.addChild(node);

        return categoryNodeRepository.save(parent);
    }

    public CategoryInfo editInfo(CategoryInfo category, CategoryRequest request) {
        category.setPath(request.getPath());
        category.setName(request.getName());
        category.setStatus(request.getStatus());
        return categoryInfoRepository.save(category);
    }

    public void move(CategoryNode fromCategoryNode, CategoryNode toCategoryNode) {
        CategoryNode parentCategoryNode = fromCategoryNode.getParent();
        CategoryInfo fromCategoryInfo = fromCategoryNode.getInfo();
        CategoryInfo toCategoryInfo = toCategoryNode.getInfo();

        fromCategoryInfo.setCode(toCategoryInfo.getCode() + "-" + toCategoryInfo.getId());
        toCategoryNode.addChild(fromCategoryNode);

        if (parentCategoryNode == null) {
            categoryNodeRepository.save(toCategoryNode);
        } else {
            parentCategoryNode.removeChild(fromCategoryNode);
            categoryNodeRepository.saveAll(List.of(parentCategoryNode, toCategoryNode));
        }
    }

    public CategoryNode deleteChild(CategoryNode categoryNode) {
        CategoryNode parentNode = categoryNode.getParent();
        if (parentNode == null) {
            throw new BaseException(HttpStatus.BAD_REQUEST.value(), "Cannot delete root");
        }
        parentNode.removeChild(categoryNode);

        categoryInfoRepository.delete(categoryNode.getInfo());
        return categoryNodeRepository.save(parentNode);
    }
}
