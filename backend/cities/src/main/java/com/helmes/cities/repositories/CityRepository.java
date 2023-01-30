package com.helmes.cities.repositories;

import com.helmes.cities.models.entities.City;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
  Page<City> findCitiesByNameContaining(String name, Pageable pageConfig);
  Page<City> findAllBy(Pageable pageConfig);
}