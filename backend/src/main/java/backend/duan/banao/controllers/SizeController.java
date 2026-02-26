package backend.duan.banao.controllers;

import backend.duan.banao.dto.ApiResponse;
import backend.duan.banao.dto.request.SizeCreateRequest;
import backend.duan.banao.dto.request.SizeUpdateRequest;
import backend.duan.banao.dto.response.PagedResponse;
import backend.duan.banao.dto.response.SizeResponse;
import backend.duan.banao.services.SizeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sizes")
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllSize(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        try {
            Page<SizeResponse> sizePage = sizeService.getAllSizes(search, page, size, sortBy, sortDir);
            PagedResponse<SizeResponse> responseData = new PagedResponse<>(sizePage);
            ApiResponse response = new ApiResponse("success", "Lấy được danh sách kích cỡ thành công", responseData);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse("error", "Đã xảy ra lỗi khi truy xuất danh sách kích cỡ", null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getSizeById(@PathVariable int id) {
        try {
            SizeResponse sizeResponse = sizeService.getSizeById(id);
            ApiResponse response = new ApiResponse("success", "Lấy kích cỡ theo id thành công", sizeResponse);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse("error", "Đã xảy ra lỗi khi truy xuất kích cỡ", null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createSize(@Valid @RequestBody SizeCreateRequest sizeCreateRequest) {
        try {
            SizeResponse sizeResponse = sizeService.createSize(sizeCreateRequest);
            ApiResponse response = new ApiResponse("success", "Thêm mới kích cỡ thành công", sizeResponse);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse("error", e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateSize(@PathVariable int id,
            @Valid @RequestBody SizeUpdateRequest sizeUpdateRequest) {
        try {
            SizeResponse sizeResponse = sizeService.updateSize(id, sizeUpdateRequest);
            ApiResponse response = new ApiResponse("success", "Cập nhật kích cỡ thành công", sizeResponse);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse("error", e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<ApiResponse> toggleStatusSize(@PathVariable Integer id) {
        try {
            SizeResponse sizeResponse = sizeService.toggleStatusSize(id);
            ApiResponse response = new ApiResponse("success", "Chuyển đổi trạng thái kích cỡ thành công", sizeResponse);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse("error", e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> softDeleteSize(@PathVariable Integer id) {
        try {
            sizeService.deleteSize(id);
            ApiResponse response = new ApiResponse("success", "Xóa kích cỡ thành công", null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse("error", e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
