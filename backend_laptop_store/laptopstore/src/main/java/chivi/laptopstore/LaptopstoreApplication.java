package chivi.laptopstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//@EnableMongoRepositories(basePackages = "chivi.laptopstore.repositories.documents")
@EnableJpaRepositories(basePackages = "chivi.laptopstore.repositories.entities")
@EnableJpaAuditing
@SpringBootApplication
public class LaptopstoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(LaptopstoreApplication.class, args);
    }
}
