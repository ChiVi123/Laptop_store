package chivi.laptopstore.controllers;

import chivi.laptopstore.common.RequestMaps;
import chivi.laptopstore.models.requests.BaseInfoRequest;
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
    public SuccessResponse createBrand(@Valid @RequestBody BaseInfoRequest baseInfoRequest) {
        return brandService.createBrand(baseInfoRequest);
    }

    @PutMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "edit/{brandId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse editCategory(@PathVariable Long brandId, @Valid @RequestBody BaseInfoRequest baseInfoRequest) {
        return brandService.editBrand(brandId, baseInfoRequest);
    }

    @DeleteMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "delete/{brandId}")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteCategory(@PathVariable Long brandId) {
        return brandService.deleteBrand(brandId);
    }

    @DeleteMapping(RequestMaps.BRAND_PATHNAME_ADMIN + "delete-all")
    @ResponseStatus(HttpStatus.OK)
    public SuccessResponse deleteAllCategory() {
        return brandService.deleteAllBrand();
    }
}
