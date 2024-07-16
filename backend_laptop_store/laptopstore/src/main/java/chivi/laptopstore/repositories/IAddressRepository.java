package chivi.laptopstore.repositories;

import chivi.laptopstore.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IAddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByAccount_Id(Long account_id);

    Optional<Address> findAddressByAccount_IdAndSelectDefault(Long account_id, boolean selectDefault);
}
