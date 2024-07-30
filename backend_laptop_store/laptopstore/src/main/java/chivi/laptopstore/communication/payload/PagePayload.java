package chivi.laptopstore.communication.payload;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PagePayload<T> {
    private int pageNumber;
    private int totalPage;
    private List<T> list;

    public PagePayload(int pageNumber, Page<T> page) {
        this.pageNumber = pageNumber + 1;
        this.totalPage = page.getTotalPages();
        this.list = page.getContent();
    }
}
