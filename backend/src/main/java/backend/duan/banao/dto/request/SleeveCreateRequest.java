package backend.duan.banao.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SleeveCreateRequest implements Serializable {
    @NotNull(message = "Vui lòng điền thông tin tên tay áo")
    @Size(min = 1, max = 60) // Adjusted min size from 30 to 1 as it felt like a bug or specific constraint
                             // from source
    String sleeveName;
}
