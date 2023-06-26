package lt.ks.vtmc.warehouseapi.report;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lt.ks.vtmc.warehouseapi.client.ClientDto;
import lt.ks.vtmc.warehouseapi.client.ClientMapper;
import lt.ks.vtmc.warehouseapi.client.ClientRepository;
import lt.ks.vtmc.warehouseapi.config.SwaggerConfig;
import lt.ks.vtmc.warehouseapi.mapper.UserMapper;
import lt.ks.vtmc.warehouseapi.security.CustomUserDetails;
import lt.ks.vtmc.warehouseapi.user.User;
import lt.ks.vtmc.warehouseapi.user.UserDto;
import lt.ks.vtmc.warehouseapi.user.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reports")
public class ReportController {

  private final ClientMapper clientMapper;
    private final ClientRepository clientRepository;
    private final TopClientsMapper topClientsMapper;

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/byQuantity")
    public List<ClientTopDto> getBiggestQuantity(@AuthenticationPrincipal CustomUserDetails currentUser) {
        Pageable pageable = PageRequest.of(0,5);
        var topClients = clientRepository.findTopClientsWithItemCount(pageable);
      return topClientsMapper.topClients(topClients);
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/byWeight")
    public List<ClientTopDto> getBiggestWeight(@AuthenticationPrincipal CustomUserDetails currentUser) {
        Pageable pageable = PageRequest.of(0,5);
        var topClients = clientRepository.findTopClientsWithItemCount(pageable);
        return topClientsMapper.topClients(topClients);
    }


}
