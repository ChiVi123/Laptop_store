package chivi.laptopstore.utils;

import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.math.MathContext;

@Slf4j
public class PriceHandler {
    public static BigDecimal discountRating(BigDecimal price, BigDecimal discount) {
        BigDecimal hundredPercent = new BigDecimal(100);
        MathContext mathContext = new MathContext(10);
        // (1 - (discount / price)) * 100
        return new BigDecimal(1).subtract(discount.divide(price, mathContext), mathContext).multiply(hundredPercent);
    }
}
