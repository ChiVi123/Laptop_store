package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.common.ResponseMessage;
import chivi.laptopstore.models.entities.BrandEntity;
import chivi.laptopstore.models.requests.BrandRequest;
import chivi.laptopstore.models.responses.SuccessResponse;
import chivi.laptopstore.services.BrandService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(RequestMaps.API_V1)
@AllArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @GetMapping(RequestMaps.BRAND_PATHNAME_PUBLIC + "all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getAllBrand() {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, brandService.getAll());
    }

    @GetMapping(RequestMaps.BRAND_PATHNAME_PUBLIC + "{id}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse getBrandById(@PathVariable Long id) {
        return new SuccessResponse(ResponseMessage.FOUND_SUCCESS, brandService.getById(id));
    }

    @PostMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createBrand(@Valid @RequestBody BrandRequest request) {
        brandService.checkConflictByName(request.getName());
        BrandEntity brand = brandService.create(request);
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, brand);
    }

    @PutMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "{id}/edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editBrand(@PathVariable Long id, @Valid @RequestBody BrandRequest request) {
        BrandEntity brand = brandService.getById(id);
        String oldName = brand.getName();
        String newName = request.getName();
        if (!oldName.equals(newName)) {
            brandService.checkConflictByName(newName);
        }
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, brandService.editInfo(brand, request));
    }

    @DeleteMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "{id}/remove-logo")
    public SuccessResponse removeBrandLogo(@PathVariable Long id) {
        BrandEntity brand = brandService.getById(id);
        brandService.removeLogo(brand);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }

    @DeleteMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "{id}/delete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteBrand(@PathVariable Long id) {
        BrandEntity brand = brandService.getById(id);
        brandService.delete(brand);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }
}
