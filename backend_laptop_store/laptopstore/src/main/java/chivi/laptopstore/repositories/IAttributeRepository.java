package chivi.laptopstore.repositories;

import chivi.laptopstore.models.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAttributeRepository extends JpaRepository<Attribute, Long> {
}
