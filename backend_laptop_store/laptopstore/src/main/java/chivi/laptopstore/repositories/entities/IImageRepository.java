package chivi.laptopstore.repositories.entities;

import chivi.laptopstore.models.entities.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRepository extends JpaRepository<ImageEntity, Long> {
}
