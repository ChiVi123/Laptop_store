package chivi.laptopstore.services;

import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.models.requests.BrandRequest;
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

    public BrandEntity create(BrandRequest request) {
        return brandRepository.save(request.getEntity());
    }

    public BrandEntity editInfo(BrandEntity brand, BrandRequest request) {
        brand.setName(request.getName());
        brand.setSlug(CustomString.toSlug(request.getName()));
        return brandRepository.save(brand);
    }

    public void deleteById(Long brandId) {
        BrandEntity brand = this.getById(brandId);
        brandRepository.delete(brand);
    }
}
