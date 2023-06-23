package lt.ks.vtmc.orderapi.user;

import lt.ks.vtmc.orderapi.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.orderapi.security.WebSecurityConfig;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with username %s not found", username)));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User getPublicUser(String clientName) {

        Optional<User> tempUser = userRepository.findByUsernameAndRole(clientName, WebSecurityConfig.GUEST);
                if(tempUser.isEmpty()){
                   User newPublicUser = new User(
                           clientName,
                           "",
                           String.format("Guest %s", clientName ),
                           "guest@mail.com",
                           WebSecurityConfig.GUEST);
                   return userRepository.save(newPublicUser);
                }else{
                    return tempUser.get();
                }
    }
}
