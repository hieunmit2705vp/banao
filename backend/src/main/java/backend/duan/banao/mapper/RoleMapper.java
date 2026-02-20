package backend.duan.banao.mapper;

import backend.duan.banao.dto.response.RoleResponse;
import backend.duan.banao.entities.Role;

public class RoleMapper {
    public static RoleResponse toRoleResponse(Role role) {
        return RoleResponse.builder().id(role.getId()).name(role.getName()).build();
    }
}