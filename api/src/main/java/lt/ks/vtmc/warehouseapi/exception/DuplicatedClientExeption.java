package lt.ks.vtmc.warehouseapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicatedClientExeption extends RuntimeException {

    public DuplicatedClientExeption(String message) {
        super(message);
    }
}
