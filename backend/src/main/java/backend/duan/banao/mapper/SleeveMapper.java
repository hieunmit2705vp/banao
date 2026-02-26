package backend.duan.banao.mapper;

import backend.duan.banao.dto.response.SleeveResponse;
import backend.duan.banao.entities.Sleeve;

public class SleeveMapper {

    public static SleeveResponse toSleeveResponse(Sleeve sleeve) {
        return SleeveResponse.builder()
                .id(sleeve.getId())
                .sleeveName(sleeve.getSleeveName())
                .status(sleeve.getStatus())
                .build();
    }

}
