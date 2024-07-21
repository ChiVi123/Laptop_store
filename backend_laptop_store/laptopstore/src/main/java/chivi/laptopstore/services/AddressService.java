package chivi.laptopstore.services;

import chivi.laptopstore.communication.requests.AddressRequest;
import chivi.laptopstore.exception.NotFoundDataException;
import chivi.laptopstore.mappers.AddressMapper;
import chivi.laptopstore.models.Address;
import chivi.laptopstore.repositories.IAddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AddressService {
    private final IAddressRepository repository;
    private final AddressMapper addressMapper;

    public Address getAddressById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundDataException("address", id));
    }

    public Address getDefaultByAccountId(Long accountId) {
        return repository.findAddressByAccount_IdAndSelectDefault(accountId, true)
                .orElseThrow(() -> new NotFoundDataException("default address", accountId));
    }

    public List<Address> getAllByAccountId(Long accountId) {
        return repository.findAllByAccount_Id(accountId);
    }

    public Address create(AddressRequest request) {
        Address address = addressMapper.mapFromAddressRequest(request);
        return repository.save(address);
    }

    public void update(Address address, AddressRequest request) {
        addressMapper.mergeFromAddressRequest(address, request);
        repository.save(address);
    }

    public void setAddressNotDefault(Long accountId) {
        Optional<Address> optional = repository.findAddressByAccount_IdAndSelectDefault(accountId, true);
        if (optional.isPresent()) {
            var address = optional.get();
            address.setSelectDefault(false);
            repository.save(address);
        }
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
