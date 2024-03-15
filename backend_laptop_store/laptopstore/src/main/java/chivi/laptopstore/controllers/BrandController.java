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

    @GetMapping(RequestMaps.BRAND_PATHNAME_PUBLIC + "find-all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse findAllBrand() {
        return brandService.findAllBrand();
    }

    @PostMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "create")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse createBrand(@Valid @RequestBody BrandRequest request) {
        brandService.checkConflictByName(request.getName());
        BrandEntity brand = brandService.create(request);
        return new SuccessResponse(ResponseMessage.CREATE_SUCCESS, brand);
    }

    @PutMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "{brandId}/edit")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editCategory(@PathVariable Long brandId, @Valid @RequestBody BrandRequest request) {
        BrandEntity brand = brandService.getById(brandId);
        if (!brand.getName().equals(request.getName())) {
            brandService.checkConflictByName(request.getName());
        }
        return new SuccessResponse(ResponseMessage.UPDATE_SUCCESS, brandService.editInfo(brand, request));
    }

    @DeleteMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "{brandId}/delete")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteBrand(@PathVariable Long brandId) {
        brandService.deleteById(brandId);
        return new SuccessResponse(ResponseMessage.DELETE_SUCCESS);
    }
}
