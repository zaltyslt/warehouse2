package lt.ks.vtmc.warehouseapi.client;

import lombok.NoArgsConstructor;
import lt.ks.vtmc.warehouseapi.item.ItemDto;

import java.time.LocalDate;
import java.util.List;

public record ClientDto(
        Long id,
        String name,
        String surname,
        LocalDate birthday,
        String phone,
        Boolean loyalty,
        List<ItemDto> items
) {

}
