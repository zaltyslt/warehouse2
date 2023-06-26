package lt.ks.vtmc.warehouseapi.item;

import lt.ks.vtmc.warehouseapi.client.Client;
import org.springframework.stereotype.Service;

@Service
public class ItemMapper {
    public Item toItem(ItemDto itemDto){
        return new Item(itemDto.id(),
                itemDto.title(),
                itemDto.weight(),
                itemDto.location(),
                itemDto.dropDate(),
                new Client(itemDto.clientId())
                );
    }

    public ItemDto toItemDto(Item item){
        return new ItemDto(
                item.getId(),
                item.getTitle(),
                item.getWeight(),
                item.getLocation(),
                item.getDropDate(),
                item.getClient().getId()
        );
    }
}
