package com.helmes.cities.controllers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.helmes.cities.models.entities.City;
import com.helmes.cities.models.requests.CityRequestConfiguration;
import com.helmes.cities.services.CityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;


@ExtendWith(MockitoExtension.class)
class CityControllerTest { // data should just pass through

  @Mock
  private CityService cityService;

  private CityController cityController;

  @BeforeEach
  public void init(){
    cityController = new CityController(cityService);
  }

  @Test
  void gettingCityPageSanityCheck() {
    CityRequestConfiguration cityRequestConfiguration = new CityRequestConfiguration(0,0,"");
    Page<City> expectedPage = Page.empty();
    when(cityService.getCityPage(cityRequestConfiguration)).thenReturn(expectedPage);
    Page<City> returnedPage = cityController.getCityPage(cityRequestConfiguration);
    assertSame(expectedPage, returnedPage);
  }

  @Test
  void updateCitySanityCheck() {
    City toUpdate = new City(); //can leave empty, no data manipulation
    doNothing().when(cityService).updateCity(toUpdate);
    cityController.updateCity(toUpdate);
  }
}