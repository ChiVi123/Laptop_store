package chivi.laptopstore.utils;

import chivi.laptopstore.exception.BaseException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
public class PriceHandler {
    private static final String ACCESS_TOKEN = "oOpQ0k4DC6H6jPFsQUPUf9XOHUSYIQrH";
    private static final String CURRENCY_URL = "https://api.apilayer.com/currency_data/convert";

    public static BigDecimal discountRating(BigDecimal price, BigDecimal discount) {
        BigDecimal hundredPercent = new BigDecimal(100);
        MathContext mathContext = new MathContext(10);
        // (1 - (discount / price)) * 100
        return new BigDecimal(1).subtract(discount.divide(price, mathContext), mathContext).multiply(hundredPercent);
    }

    public static double exchange(BigDecimal amount) throws IOException {
        String url_str = CURRENCY_URL + "?from=VND&to=USD&amount=" + amount;
        URL url = new URL(url_str);
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.setRequestMethod("GET");
        request.setRequestProperty("apikey", ACCESS_TOKEN);
        request.connect();

        if (request.getResponseCode() != HttpURLConnection.HTTP_OK)
            throw new BaseException(HttpStatus.EXPECTATION_FAILED.value(), "Failed when exchange money");

        JsonObject jsonObject = JsonParser.parseReader(
                new InputStreamReader((InputStream) request.getContent())
        ).getAsJsonObject();
        String result = jsonObject.get("result").getAsString();
        request.disconnect();

        return new BigDecimal(result).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }
}
