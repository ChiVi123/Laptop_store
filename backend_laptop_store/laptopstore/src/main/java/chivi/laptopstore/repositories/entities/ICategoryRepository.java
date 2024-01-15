package chivi.laptopstore.repositories.entities;

import chivi.laptopstore.models.entities.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<CategoryModel, Long> {
}
