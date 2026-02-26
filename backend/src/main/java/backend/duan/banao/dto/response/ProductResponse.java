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
public class ProductResponse implements Serializable {
    private Integer id;
    private BrandResponse brand;
    private CategoryResponse category;
    private MaterialResponse material;
    private String productName;
    private String productCode;
    private Boolean status;
}
