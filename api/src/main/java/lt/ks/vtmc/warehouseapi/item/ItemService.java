package lt.ks.vtmc.warehouseapi.item;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.warehouseapi.client.Client;
import lt.ks.vtmc.warehouseapi.client.ClientRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public List<Item> getItems() {

        return itemRepository.findAll(Sort.by("title"));
    }



}
