package lt.ks.vtmc.orderapi.order;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.orderapi.mapper.OrderMapper;
import lt.ks.vtmc.orderapi.rest.dto.OrderDto;
import lt.ks.vtmc.orderapi.security.CustomUserDetails;
import lt.ks.vtmc.orderapi.user.User;
import lt.ks.vtmc.orderapi.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static lt.ks.vtmc.orderapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public/orders")
public class PublicOrderController {

    //    private final UserService userService;
    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final UserService userService;


    //    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<OrderDto> getOrders(@RequestParam(value = "text", required = false) String text) {
        List<Order> orders = (text == null) ? orderService.getOrders() : orderService.getOrdersContainingText(text);

        var result = orders.stream()
                .map(orderMapper::toOrderDto)
                .collect(Collectors.toList());
        return result;
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public OrderDto createOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
                                @Valid @RequestBody CreateOrderRequest createOrderRequest) {


        Order order = orderMapper.toOrder(createOrderRequest);
        order.setId(UUID.randomUUID().toString());

        User user = userService.getPublicUser(createOrderRequest.getClientName());
        user.setEmail("");
        order.setUser(user);
        order = orderService.saveOrder(order);
        return orderMapper.toOrderDto(order);

    }

//    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
//    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping
//    public OrderDto createOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
//                                @Valid @RequestBody CreateOrderRequest createOrderRequest) {
//        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
//        Order order = orderMapper.toOrder(createOrderRequest);
//        order.setId(UUID.randomUUID().toString());
//        order.setUser(user);
//        return orderMapper.toOrderDto(orderService.saveOrder(order));
//    }
//
//    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
//    @DeleteMapping("/{id}")
//    public OrderDto deleteOrders(@PathVariable UUID id) {
//        Order order = orderService.validateAndGetOrder(id.toString());
//        orderService.deleteOrder(order);
//        return orderMapper.toOrderDto(order);
//    }
}
