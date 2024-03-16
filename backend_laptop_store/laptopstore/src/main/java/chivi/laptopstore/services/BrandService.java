package chivi.laptopstore.services;

import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.exceptions.ConflictException;
import chivi.laptopstore.models.exceptions.CustomNotFoundException;
import chivi.laptopstore.models.requests.BrandRequest;
import chivi.laptopstore.repositories.entities.IBrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BrandService {
    private final IBrandRepository repository;

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
        return repository.save(brand);
    }

    public BrandEntity editInfo(BrandEntity brand, BrandRequest request) {
        brand.setName(request.getName());
        brand.setSlug(request.getSlug());
        return repository.save(brand);
    }

    public void deleteById(Long brandId) {
        BrandEntity brand = this.getById(brandId);
        repository.delete(brand);
    }
}
