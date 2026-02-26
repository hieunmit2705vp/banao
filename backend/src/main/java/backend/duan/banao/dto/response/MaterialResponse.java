package backend.duan.banao.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaterialResponse implements Serializable {
    private Integer id;
    private String materialName;
    private Boolean status;
}
