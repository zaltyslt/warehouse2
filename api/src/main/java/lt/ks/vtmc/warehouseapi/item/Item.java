package lt.ks.vtmc.warehouseapi.item;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.ks.vtmc.warehouseapi.client.Client;

import java.time.LocalDate;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Double weight;
    @Min(1)
    @Max(40)
    private Byte location;
    private LocalDate dropDate;


    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name="client_id")
    private Client client;


    @PrePersist
    public void onPrePersist() {

        dropDate = LocalDate.now();
    }
}