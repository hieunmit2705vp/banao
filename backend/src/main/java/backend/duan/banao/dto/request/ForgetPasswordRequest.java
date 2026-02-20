package backend.duan.banao.dto.request;

import lombok.Data;

@Data
public class ForgetPasswordRequest {
    private String usernameOrEmail;
}