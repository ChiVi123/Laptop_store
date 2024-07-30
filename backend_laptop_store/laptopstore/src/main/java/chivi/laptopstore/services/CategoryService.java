package chivi.laptopstore.services;

import chivi.laptopstore.exception.BaseException;
import chivi.laptopstore.exception.ConflictException;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.CategoryInfo;
import chivi.laptopstore.models.CategoryNode;
import chivi.laptopstore.communication.requests.CategoryRequest;
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

    public CategoryNode getNodeByInfoId(Long info_id) {
        return categoryNodeRepository
                .findByInfo_Id(info_id)
                .orElseThrow(() -> new NotFoundDataException("node category", info_id));
    }

    public Set<CategoryInfo> getAllByIds(List<Long> ids) {
        return categoryInfoRepository.findAllByIdIn(ids);
    }

    public List<Long> getAllIdIsLeafByCode(String code) {
        return categoryInfoRepository.findAllIdByCodeLikeAndLeaf(code, true);
    }

    public CategoryNode getNodeById(Long id) {
        return categoryNodeRepository.findById(id).orElseThrow(() -> new NotFoundDataException("node category", id));
    }

    public CategoryInfo getInfoById(Long id) {
        return categoryInfoRepository.findById(id).orElseThrow(() -> new NotFoundDataException("category", id));
    }

    public void checkConflictByName(String name) {
        if (categoryInfoRepository.existsByName(name)) {
            throw new ConflictException("Category", name);
        }
    }

    public CategoryNode create(CategoryNode parent, CategoryRequest request) {
        CategoryInfo parentInfo = parent.getInfo();
        CategoryInfo info = new CategoryInfo();
        CategoryNode node = new CategoryNode();

        info.setName(request.getName());
        info.setPath(request.getPath());
        info.setCode(parent.getInfo().getCode() + "-" + parent.getInfo().getId());
        info.setLeaf(true);
        info.setStatus(request.getStatus());
        parentInfo.setLeaf(false);

        categoryInfoRepository.save(parentInfo);
        CategoryInfo resultInfo = categoryInfoRepository.save(info);

        node.setInfo(resultInfo);
        parent.addChild(node);
        parent = categoryNodeRepository.save(parent);

        return parent.getChildren().get(parent.getChildren().size() - 1);
    }

    public CategoryInfo editInfo(CategoryInfo category, CategoryRequest request) {
        category.setPath(request.getPath());
        category.setName(request.getName());
        category.setStatus(request.getStatus());
        return categoryInfoRepository.save(category);
    }

    public void move(CategoryNode fromNode, CategoryNode toNode) {
        CategoryInfo fromInfo = fromNode.getInfo();
        CategoryInfo toInfo = toNode.getInfo();

        fromInfo.setCode(toInfo.getCode() + "-" + toInfo.getId());
        toInfo.setLeaf(false);
        toNode.addChild(fromNode);

        categoryInfoRepository.save(toInfo);
        categoryNodeRepository.save(toNode);
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
