package chivi.laptopstore.models;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
public abstract class Model {
    @Id
    protected String id;
    @CreatedDate
    protected LocalDateTime createdDate;
    @LastModifiedDate
    protected LocalDateTime lastModifiedDate;

    public Model() {
//        this.createdDate = LocalDateTime.now();
//        this.lastModifiedDate = LocalDateTime.now();
    }

    public void setLastModifiedDateNow() {
        this.lastModifiedDate = LocalDateTime.now();
    }
}
