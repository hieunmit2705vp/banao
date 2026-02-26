package backend.duan.banao.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ColorResponse implements Serializable {
    Integer id;
    String colorName;
    Boolean status;
}
