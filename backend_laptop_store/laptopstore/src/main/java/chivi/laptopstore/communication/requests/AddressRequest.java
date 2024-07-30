package chivi.laptopstore.communication.requests;

import chivi.laptopstore.common.DeliveryAddressType;
import jakarta.validation.constraints.NotNull;

public record AddressRequest(
        Long id,
        @NotNull(message = "Account id is required")
        Long accountId,
        @NotNull(message = "Full name is required")
        String fullName,
        @NotNull(message = "Phone is is required")
        String phone,
        @NotNull(message = "Province is not blank")
        String province,
        @NotNull(message = "Province id is required")
        int provinceId,
        @NotNull(message = "Ward is required")
        String ward,
        @NotNull(message = "Ward id is required")
        int wardId,
        @NotNull(message = "District is required")
        String district,
        @NotNull(message = "District id is required")
        int districtId,
        @NotNull(message = "District is required")
        String street,
        @NotNull(message = "Default is required")
        boolean selectDefault,
        @NotNull(message = "Delivery address type is required")
        DeliveryAddressType deliveryAddressType
) {
}
