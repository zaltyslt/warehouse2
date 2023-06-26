package lt.ks.vtmc.warehouseapi.client;

import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.warehouseapi.item.Item;
import lt.ks.vtmc.warehouseapi.item.ItemDto;
import lt.ks.vtmc.warehouseapi.item.ItemMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ClientMapper {
    public final ItemMapper itemMapper;

    public Client toClient(ClientDto clientDto) {
        List<Item> items = clientDto.items().stream()
                .map(i -> itemMapper.toItem(i))
                .toList();

        Client newClient = new Client(
                clientDto.id(),
                clientDto.name(),
                clientDto.surname(),
                clientDto.birthday(),
                clientDto.phone(),
                clientDto.loyalty(),
                items);

        return newClient;
    }

    public ClientDto toClientDto(Client client) {
        List<ItemDto> itemDtos = client.getItems().stream()
                .map(i -> itemMapper.toItemDto(i))
                .toList();

        return new ClientDto(
                client.getId(),
                client.getName(),
                client.getSurname(),
                client.getBirthDay(),
                client.getPhone(),
                client.getLoyalty(),
                itemDtos);

    }
}
