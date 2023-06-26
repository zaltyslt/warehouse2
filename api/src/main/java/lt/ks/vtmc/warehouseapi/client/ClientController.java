package lt.ks.vtmc.warehouseapi.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.DeserializationProblemHandler;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.warehouseapi.config.SwaggerConfig;
import lt.ks.vtmc.warehouseapi.security.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clients")
public class ClientController {

   private final ClientRepository clientRepository;
   private final ClientService clientService;
   private final ClientMapper clientMapper;

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<ClientDto> getClients(@RequestParam(value = "text", required = false) String text) {
        List<Client> clients = (text == null)
                ? clientService.getClients()
                :  new ArrayList<>(Arrays.asList(clientService.getClient(Long.parseLong(text))));

        return clients.stream()
                .map(clientMapper::toClientDto)
               .toList();
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ClientDto  createClient(@AuthenticationPrincipal CustomUserDetails currentUser,
                                @Valid
                                @RequestBody ClientDto clientDto) {

        Client newClient = clientService.createClient(clientMapper.toClient(clientDto));
        return clientMapper.toClientDto(newClient);
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
//    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
//    @ResponseStatus(HttpStatus.OK)
//    @DeleteMapping("/{id}")
//    public void deleteOrders(@PathVariable UUID id) {
//        Order order = orderService.validateAndGetOrder(id.toString());
//        orderService.deleteOrder(order);
////        return orderMapper.toOrderDto(order);
//    }
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
