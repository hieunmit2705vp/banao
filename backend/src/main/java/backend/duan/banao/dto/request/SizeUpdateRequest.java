package backend.duan.banao.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SizeUpdateRequest implements Serializable {
    @NotNull
    Integer id;

    @NotNull(message = "Vui lòng điền thông tin tên kích cỡ")
    @Size(max = 100, message = "Tên kích cỡ không được vượt quá 100 ký tự")
    String name;
}
