package com.helmes.cities.services;

import com.helmes.cities.models.entities.City;
import com.helmes.cities.models.requests.CityRequestConfiguration;
import com.helmes.cities.repositories.CityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CityService {

  private final CityRepository cityRepository;

  public CityService(CityRepository cityRepository) {
    this.cityRepository = cityRepository;
  }

  public Page<City> getCityPage(CityRequestConfiguration requestConfiguration){
    Pageable pageConfig =
        Pageable.ofSize(requestConfiguration.getSize())
            .withPage( requestConfiguration.getPage());

    String search = requestConfiguration.getSearch();
    if(search == null || search.isBlank()){
      return cityRepository.findAllBy(pageConfig);
    }
    return cityRepository.findCitiesByNameContaining(search, pageConfig);
  }

  public void updateCity(City city){
    cityRepository.save(city);
  }
}
