package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.requests.BaseInfoRequest;
import chivi.laptopstore.models.responses.ResponseModel;
import chivi.laptopstore.repositories.entities.IBrandRepository;
import chivi.laptopstore.utils.CustomString;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class BrandService {
    private final IBrandRepository brandRepository;

    public ResponseModel findAllBrand() {
        return new ResponseModel(true, "Success", brandRepository.findAll());
    }

    public ResponseModel createBrand(BaseInfoRequest baseInfoRequest) {
        String slug = CustomString.toSlug(baseInfoRequest.getName());
        return new ResponseModel(true, "Success", brandRepository.save(new BrandEntity(baseInfoRequest.getName(), slug)));
    }

    public ResponseModel editBrand(Long brandId, BaseInfoRequest baseInfoRequest) {
        Optional<BrandEntity> optional = brandRepository.findById(brandId);

        if (optional.isEmpty()) {
            return new ResponseModel(false, "Can't find brand", new BrandEntity());
        }

        optional.get().setName(baseInfoRequest.getName());
        optional.get().setSlug(CustomString.toSlug(baseInfoRequest.getName()));
        return new ResponseModel(true, "Edit success", brandRepository.save(optional.get()));
    }

    public ResponseModel deleteBrand(Long brandId) {
        Optional<BrandEntity> optionalBrand = brandRepository.findById(brandId);
        if (optionalBrand.isEmpty()) {
            return new ResponseModel(false, "Can't found brand", "");
        }

        brandRepository.delete(optionalBrand.get());
        return new ResponseModel(true, "Delete brand success", "");
    }

    public ResponseModel deleteAllBrand() {
        brandRepository.deleteAll();
        return new ResponseModel(true, "Delete all brand success", "");
    }
}
