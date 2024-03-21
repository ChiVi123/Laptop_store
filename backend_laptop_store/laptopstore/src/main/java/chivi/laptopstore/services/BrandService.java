package chivi.laptopstore.services;

import chivi.laptopstore.configurations.CloudinaryConfig;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.models.requests.BrandRequest;
import chivi.laptopstore.repositories.entities.IBrandRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class BrandService {
    private final IBrandRepository repository;
    private final CloudinaryConfig cloudinaryConfig;

    public List<BrandEntity> getAll() {
        return repository.findAll();
    }

    public BrandEntity getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new CustomNotFoundException("brand", id));
    }

    public void checkConflictByName(String name) {
        if (repository.existsByName(name)) {
            throw new ConflictException("Brand", name);
        }
    }

    public BrandEntity create(BrandRequest request) {
        BrandEntity brand = new BrandEntity();
        brand.setName(request.getName());
        brand.setSlug(request.getSlug());
        brand.setLogo(request.getLogo());
        brand.setStatus(request.getStatus());
        return repository.save(brand);
    }

    public BrandEntity editInfo(BrandEntity brand, BrandRequest request) {
        brand.setName(request.getName());
        brand.setSlug(request.getSlug());
        brand.setLogo(request.getLogo());
        brand.setStatus(request.getStatus());
        return repository.save(brand);
    }

    public BrandEntity removeLogo(BrandEntity brand) {
        try {
            cloudinaryConfig.deleteImage(brand.getLogo().getPublicId());
            brand.setLogo(null);
        } catch (IOException ioException) {
            log.error("Remove logo brand: {}", ioException.getMessage());
        }
        return repository.save(brand);
    }

    public void delete(BrandEntity brand) {
        try {
            cloudinaryConfig.deleteImage(brand.getLogo().getPublicId());
        } catch (IOException ioException) {
            log.error("Remove logo brand: {}", ioException.getMessage());
        }
        repository.delete(brand);
    }
}
