package chivi.laptopstore.models.entities;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = EntityNames.TABLE_IMAGE)
@NoArgsConstructor
@Data
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = EntityNames.COLUMN_IMAGE_ID)
    private Long id;

    @Column(unique = true, nullable = false)
    private String public_id;

    private int width;

    private int height;

    private int bytes;

    @Column(unique = true, nullable = false)
    private String secure_url;

    @Column(nullable = false)
    private String folder;
}