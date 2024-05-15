package chivi.laptopstore.services;

import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.models.entities.Image;
import chivi.laptopstore.repositories.IImageRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class ImageService {
    private final IImageRepository repository;

    public Image getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundDataException("image", id));
    }
}
