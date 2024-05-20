package chivi.laptopstore.models;

import chivi.laptopstore.common.EntityNames;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = EntityNames.TABLE_IMAGE)
@NoArgsConstructor
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = EntityNames.COLUMN_IMAGE_PUBLIC_ID, unique = true, nullable = false)
    private String publicId;

    private int width;

    private int height;

    private int bytes;

    @Column(name = EntityNames.COLUMN_IMAGE_SECURE_URL, unique = true, nullable = false)
    private String secureUrl;

    @Column(nullable = false)
    private String folder;
}