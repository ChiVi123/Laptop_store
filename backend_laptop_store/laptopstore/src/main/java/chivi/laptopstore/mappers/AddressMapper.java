package chivi.laptopstore.mappers;

import chivi.laptopstore.communication.requests.AddressRequest;
import chivi.laptopstore.models.Account;
import chivi.laptopstore.models.Address;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class AddressMapper {
    public Address mapFromAddressRequest(AddressRequest request) {
        return Address.builder()
                .account(Account.builder().id(request.accountId()).build())
                .fullName(request.fullName())
                .phone(request.phone())
                .province(request.province())
                .provinceId(request.provinceId())
                .ward(request.ward())
                .wardId(request.wardId())
                .district(request.district())
                .districtId(request.districtId())
                .street(request.street())
                .selectDefault(request.selectDefault())
                .deliveryAddressType(request.deliveryAddressType())
                .build();
    }

    public void mergeFromAddressRequest(Address address, AddressRequest request) {
        if (StringUtils.isNoneBlank(request.fullName())) {
            address.setFullName(request.fullName());
        }

        if (StringUtils.isNoneBlank(request.phone())) {
            address.setPhone(request.phone());
        }

        if (StringUtils.isNoneBlank(request.province())) {
            address.setProvince(request.province());
            address.setProvinceId(request.provinceId());
        }

        if (StringUtils.isNoneBlank(request.ward())) {
            address.setWard(request.ward());
            address.setWardId(request.wardId());
        }

        if (StringUtils.isNoneBlank(request.district())) {
            address.setDistrict(request.district());
            address.setDistrictId(request.districtId());
        }

        if (StringUtils.isNoneBlank(request.street())) {
            address.setStreet(request.street());
        }

        address.setSelectDefault(request.selectDefault());
        address.setDeliveryAddressType(request.deliveryAddressType());
    }
}
