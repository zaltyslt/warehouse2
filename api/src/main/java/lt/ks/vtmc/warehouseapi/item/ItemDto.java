package lt.ks.vtmc.warehouseapi.item;

import lombok.NoArgsConstructor;

import java.time.LocalDate;

public record ItemDto(Long id, String title, Double weight, Byte location, LocalDate dropDate, Long clientId){

}
