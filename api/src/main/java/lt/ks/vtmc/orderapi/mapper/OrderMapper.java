package lt.ks.vtmc.orderapi.mapper;

import lt.ks.vtmc.orderapi.order.Order;
import lt.ks.vtmc.orderapi.order.CreateOrderRequest;
import lt.ks.vtmc.orderapi.rest.dto.OrderDto;

public interface OrderMapper {

    Order toOrder(CreateOrderRequest createOrderRequest);

    OrderDto toOrderDto(Order order);
}