package chivi.laptopstore.utils;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class CustomString {
    public static String toSlug(String value) {
        // https://stackoverflow.com/questions/1657193/java-code-library-for-generating-slugs-for-use-in-pretty-urls
        Pattern nonLatin = Pattern.compile("[^\\w-]");
        Pattern whiteSpace = Pattern.compile("\\s");
        String noWhiteSpace = whiteSpace.matcher(value).replaceAll("-");
        String normalized = Normalizer.normalize(noWhiteSpace, Normalizer.Form.NFD);
        return nonLatin.matcher(normalized).replaceAll("").toLowerCase(Locale.ENGLISH);
    }
}
