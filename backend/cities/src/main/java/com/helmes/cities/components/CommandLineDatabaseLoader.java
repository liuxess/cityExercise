package com.helmes.cities.components;

import com.helmes.cities.models.entities.City;
import com.helmes.cities.models.mappers.CityCSVMapper;
import com.helmes.cities.repositories.CityRepository;
import java.io.File;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineDatabaseLoader implements CommandLineRunner {

  @Autowired
  private CityRepository cityRepository;

  @Override
  public void run(String...args) throws Exception {
    //if at least one exists, skip
    if(cityRepository.existsById(1L)) return;

    //else, initialize
    CityCSVMapper cityCSVMapper = new CityCSVMapper();

    URI csvURI = this.getClass().getResource("/DBSeeds/cities.csv").toURI();
    List<City> cities = cityCSVMapper.mapCitiesFromCSV(new File(csvURI));

    cityRepository.saveAll(cities);
  }

}