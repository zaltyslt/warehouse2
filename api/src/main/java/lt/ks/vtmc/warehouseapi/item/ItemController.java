package lt.ks.vtmc.warehouseapi.item;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.warehouseapi.client.*;
import lt.ks.vtmc.warehouseapi.config.SwaggerConfig;
import lt.ks.vtmc.warehouseapi.security.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/items")
public class ItemController {


    private final ClientService clientService;
    private final ClientMapper clientMapper;
    private final ItemMapper itemMapper;
    private final ItemRepository itemRepository;

//    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
//    @GetMapping
//    public List<Client> getClients(@RequestParam(value = "text", required = false) String text) {
//        List<Client> clients = (text == null) ? clientService.getClients() : clientService.getClient(Long.parseLong(text));
//
//        var result = clients.stream()
//                .map(clientMapper::toClientDto)
//               .toList();
//        return clients;
//    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ItemDto createItem(@AuthenticationPrincipal CustomUserDetails currentUser,
                              @Valid @RequestBody ItemDto itemDto) {
        if (clientService.clientExists(itemDto.clientId())) {
            Client client = clientService.getClient(itemDto.clientId());
            Item newItem = itemMapper.toItem(itemDto);
            newItem.setClient(client);
            newItem = itemRepository.save(newItem);
            return itemMapper.toItemDto(newItem);
        }
//       return new ItemDto(10L, "title" , 7.0, (byte)3, LocalDate.now(), itemDto.clientId());
        throw new RuntimeException("Client does not exists!");
    }
//
//    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
//    @ResponseStatus(HttpStatus.OK)
//    @PostMapping("/update")t
//    public OrderDto updateOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
//                             @Valid @RequestBody OrderDto createOrderRequest) {
////var aa = createOrderRequest;
//        String requestId = createOrderRequest.id();
//        var orderToUpdate = orderService.getOrderByID(requestId);
//        var aa = orderService.saveOrder(orderToUpdate);
//        return orderMapper.toOrderDto(aa);
//
//    }
//
    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping
    public void deleteItem(@RequestParam("id") Long id) {
        itemRepository.deleteById(id);
//        return orderMapper.toOrderDto(order);
    }
//
//    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
//    @ResponseStatus(HttpStatus.OK)
//    @PatchMapping
//    public List<Order> validate(@Valid @RequestBody CreateOrderRequest createOrderRequest) {
//
////   return orderMapper.toOrderDto(order);
//        return new ArrayList<>();
//    }
}
