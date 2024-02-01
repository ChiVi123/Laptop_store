package chivi.laptopstore.utils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ElementHTML {
    public String createElement(String tag, Map<String, Object> props, List<String> children) {
        String passProps;
        String whiteSpace = " ";
        String passChildren = String.join("", children);
        String formatNoneAttributes = "<%1$s>%2$s</%1$s>"; // <a>children</a> ( a=%1$s children=%2$s )
        String formatElement = "<%1$s %2$s>%3$s</%1$s>"; // <a class="button">children</a> ( a=>%1$s class="button"=>%2$s children=>%3$s )

        if (props == null) {
            return String.format(formatNoneAttributes, tag, passChildren);
        }

        passProps = props.entrySet().stream().map(this::joinKeyValue).collect(Collectors.joining(whiteSpace));
        return String.format(formatElement, tag, passProps, passChildren);
    }

    private String joinKeyValue(Map.Entry<String, Object> entry) {
        String key = entry.getKey();
        Object value = entry.getValue();
        return String.format("%1$s=\"%2$s\"", key, value);
    }
}
