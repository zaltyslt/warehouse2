package lt.ks.vtmc.warehouseapi.mapper;

import lt.ks.vtmc.warehouseapi.order.Order;
import lt.ks.vtmc.warehouseapi.order.CreateOrderRequest;
import lt.ks.vtmc.warehouseapi.rest.dto.OrderDto;
import org.springframework.stereotype.Service;

@Service
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order toOrder(CreateOrderRequest createOrderRequest) {
        if (createOrderRequest == null) {
            return null;
        }


        return new Order(
                createOrderRequest.getDescription(),
                createOrderRequest.getClientName(),
               null
        );
    }

    @Override
    public OrderDto toOrderDto(Order order) {
        if (order == null) {
            return null;
        }
        OrderDto.UserDto userDto = new OrderDto.UserDto(order.getUser().getUsername());

        return new OrderDto(
                order.getId(),
                order.getDescription(),
                order.getClientName(),
                userDto,
                order.getCreatedAt());
    }
}
