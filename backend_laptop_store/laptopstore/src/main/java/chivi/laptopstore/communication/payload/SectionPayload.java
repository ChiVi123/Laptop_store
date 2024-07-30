package chivi.laptopstore.communication.payload;

import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class SectionPayload {
    public String title;
    public List<?> list;
}
