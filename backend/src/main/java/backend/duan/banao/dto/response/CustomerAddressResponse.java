package backend.duan.banao.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerAddressResponse {
    private Integer id;
    private String provinceName;
    private String districtName;
    private String wardName;
    private String addressDetail;
}
