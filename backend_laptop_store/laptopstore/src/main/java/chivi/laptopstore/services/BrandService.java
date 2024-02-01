package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
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

    public BrandEntity getById(Long id) {
        return brandRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("brand", id));
    }

    public void checkConflictByName(String name) {
        if (brandRepository.existsByName(name)) {
            throw new ConflictException("Brand", name);
        }
    }

    public BrandEntity createBrand(BaseInfoRequest baseInfoRequest) {
        String slug = CustomString.toSlug(baseInfoRequest.getName());
        return brandRepository.save(new BrandEntity(baseInfoRequest.getName(), slug));
    }

    public BrandEntity editBrand(BrandEntity brand, BaseInfoRequest baseInfoRequest) {

        brand.setName(baseInfoRequest.getName());
        brand.setSlug(CustomString.toSlug(baseInfoRequest.getName()));
        return brandRepository.save(brand);
    }

    public void deleteBrand(Long brandId) {
        BrandEntity brand = this.getById(brandId);
        brandRepository.delete(brand);
    }
}
