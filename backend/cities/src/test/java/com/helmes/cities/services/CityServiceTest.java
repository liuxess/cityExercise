package com.helmes.cities.services;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import com.helmes.cities.models.entities.City;
import com.helmes.cities.models.requests.CityRequestConfiguration;
import com.helmes.cities.repositories.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.MockitoRule;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class CityServiceTest {

  private static final int PAGE = 0;
  private static final int PAGE_SIZE = 10;

  @Mock
  private CityRepository cityRepository;

  private CityService cityService;

  @BeforeEach
  public void init(){
    cityService = new CityService(cityRepository);
  }


  @Test
  void testGetCityPageWhenSearchIsEmpty() {
    CityRequestConfiguration configWithEmptySearch = new CityRequestConfiguration(PAGE, PAGE_SIZE, "");
    Pageable pageableExpected = Pageable.ofSize(PAGE_SIZE).withPage(PAGE);
    Page<City> pageToBeReturned = Page.empty();

    when(cityRepository.findAllBy(pageableExpected)).thenReturn(pageToBeReturned);
    lenient().when(cityRepository.findCitiesByNameContaining("", pageableExpected)).thenThrow(new RuntimeException("Should not search by name if no search provided"));

    cityService.getCityPage(configWithEmptySearch);
  }

  @Test
  void testGetCityPageWhenSearchIsNotEmpty() {
    CityRequestConfiguration configWithEmptySearch = new CityRequestConfiguration(PAGE, PAGE_SIZE, "Search Is provided");
    Pageable pageableExpected = Pageable.ofSize(PAGE_SIZE).withPage(PAGE);
    Page<City> pageToBeReturned = Page.empty();

    lenient().when(cityRepository.findAllBy(pageableExpected)).thenThrow(new RuntimeException("Should search by name if  search is provided")) ;
    when(cityRepository.findCitiesByNameContaining("Search Is provided", pageableExpected)).thenReturn(pageToBeReturned);

    cityService.getCityPage(configWithEmptySearch);
  }

  @Test
  void testUpdateCityDoesNotThrowErrors() {
    City toUpdate = new City(); //can leave empty, no data manipulation
    when(cityRepository.save(toUpdate)).thenReturn(toUpdate);
    cityService.updateCity(toUpdate);
  }
}