package lt.ks.vtmc.warehouseapi.mapper;

import lt.ks.vtmc.warehouseapi.order.Order;
import lt.ks.vtmc.warehouseapi.order.CreateOrderRequest;
import lt.ks.vtmc.warehouseapi.rest.dto.OrderDto;

public interface OrderMapper {

    Order toOrder(CreateOrderRequest createOrderRequest);

    OrderDto toOrderDto(Order order);
}