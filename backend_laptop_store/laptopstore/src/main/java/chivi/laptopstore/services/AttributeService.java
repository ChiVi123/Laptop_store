package chivi.laptopstore.services;

import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.entities.Attribute;
import chivi.laptopstore.repositories.IAttributeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class AttributeService {
    private final IAttributeRepository repository;

    public Attribute getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundDataException("attribute", id));
    }
}
