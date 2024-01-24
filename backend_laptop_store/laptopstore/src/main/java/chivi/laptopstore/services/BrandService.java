package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.NotFoundException;
import chivi.laptopstore.models.requests.BaseInfoRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.repositories.entities.IBrandRepository;
import chivi.laptopstore.utils.CustomString;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BrandService {
    private final IBrandRepository brandRepository;

    public SuccessResponse findAllBrand() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, brandRepository.findAll());
    }

    public SuccessResponse createBrand(BaseInfoRequest baseInfoRequest) {
        this.handleConflictBrandByName(baseInfoRequest.getName());

        String slug = CustomString.toSlug(baseInfoRequest.getName());
        BrandEntity brand = new BrandEntity(baseInfoRequest.getName(), slug);
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, brandRepository.save(brand));
    }

    public SuccessResponse editBrand(Long brandId, BaseInfoRequest baseInfoRequest) {
        BrandEntity brand = this.handleFindBrandById(brandId);

        if (!brand.getName().equals(baseInfoRequest.getName())) {
            this.handleConflictBrandByName(baseInfoRequest.getName());
            brand.setName(baseInfoRequest.getName());
            brand.setSlug(CustomString.toSlug(baseInfoRequest.getName()));
        }

        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, brandRepository.save(brand));
    }

    public SuccessResponse deleteBrand(Long brandId) {
        BrandEntity brand = this.handleFindBrandById(brandId);
        brandRepository.delete(brand);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

    public SuccessResponse deleteAllBrand() {
        brandRepository.deleteAll();
        return new SuccessResponse(ResponseMessage.DELETE_ALL_SUCCESS);
    }

    private BrandEntity handleFindBrandById(Long id) {
        return brandRepository.findById(id).orElseThrow(() -> new NotFoundException("brand", id));
    }

    private void handleConflictBrandByName(String name) {
        if (brandRepository.existsByName(name)) {
            throw new ConflictException("Brand", name);
        }
    }
}
