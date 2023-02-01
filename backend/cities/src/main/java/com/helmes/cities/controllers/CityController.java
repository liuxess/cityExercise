package com.helmes.cities.controllers;

import com.helmes.cities.models.entities.City;
import com.helmes.cities.models.requests.CityRequestConfiguration;
import com.helmes.cities.services.CityService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/cities")
public class CityController {

  private final CityService cityService;

  protected CityController(CityService cityService) {
    this.cityService = cityService;
  }

  @PostMapping("/")
  public Page<City> getCityPage(@RequestBody CityRequestConfiguration cityRequestConfiguration){
    return cityService.getCityPage(cityRequestConfiguration);
  }

  @PutMapping("/edit")
  public void updateCity(@RequestBody City city){
    cityService.updateCity(city);
  }

}
