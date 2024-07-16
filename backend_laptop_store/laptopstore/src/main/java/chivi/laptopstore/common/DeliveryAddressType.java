package chivi.laptopstore.common;

import lombok.Getter;

@Getter
public enum DeliveryAddressType {
    HOME("home"),
    COMPANY("company");

    private final String value;

    DeliveryAddressType(String value) {
        this.value = value;
    }
}
