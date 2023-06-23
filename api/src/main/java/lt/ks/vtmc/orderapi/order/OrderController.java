package lt.ks.vtmc.orderapi.order;

import lt.ks.vtmc.orderapi.mapper.OrderMapper;
import lt.ks.vtmc.orderapi.user.User;
import lt.ks.vtmc.orderapi.rest.dto.OrderDto;
import lt.ks.vtmc.orderapi.security.CustomUserDetails;
import lt.ks.vtmc.orderapi.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.orderapi.config.SwaggerConfig;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final UserService userService;
    private final OrderService orderService;
    private final OrderMapper orderMapper;

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<OrderDto> getOrders(@RequestParam(value = "text", required = false) String text) {
        List<Order> orders = (text == null) ? orderService.getOrders() : orderService.getOrdersContainingText(text);

        var result = orders.stream()
                .map(orderMapper::toOrderDto)
                .collect(Collectors.toList());
        return result;
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public OrderDto createOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
                                @Valid @RequestBody CreateOrderRequest createOrderRequest) {

        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Order order = orderMapper.toOrder(createOrderRequest);
        order.setId(UUID.randomUUID().toString());
        order.setUser(user);
        return orderMapper.toOrderDto(orderService.saveOrder(order));
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/update")
    public OrderDto updateOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
                             @Valid @RequestBody OrderDto createOrderRequest) {
//var aa = createOrderRequest;
        String requestId = createOrderRequest.id();
        var orderToUpdate = orderService.getOrderByID(requestId);
        var aa = orderService.saveOrder(orderToUpdate);
        return orderMapper.toOrderDto(aa);

    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteOrders(@PathVariable UUID id) {
        Order order = orderService.validateAndGetOrder(id.toString());
        orderService.deleteOrder(order);
//        return orderMapper.toOrderDto(order);
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping
    public List<Order> validate(@Valid @RequestBody CreateOrderRequest createOrderRequest) {

//   return orderMapper.toOrderDto(order);
        return new ArrayList<>();
    }
}
