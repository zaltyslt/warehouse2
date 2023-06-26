package lt.ks.vtmc.warehouseapi.mapper;

import lt.ks.vtmc.warehouseapi.user.User;
import lt.ks.vtmc.warehouseapi.user.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);
}