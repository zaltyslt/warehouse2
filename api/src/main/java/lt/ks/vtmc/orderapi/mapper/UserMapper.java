package lt.ks.vtmc.orderapi.mapper;

import lt.ks.vtmc.orderapi.user.User;
import lt.ks.vtmc.orderapi.user.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);
}