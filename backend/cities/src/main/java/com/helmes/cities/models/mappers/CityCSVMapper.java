package com.helmes.cities.models.mappers;

import com.helmes.cities.models.entities.City;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CityCSVMapper {

    private static final String COMMA_DELIMITER = ",";
    private final List<String> headers = new ArrayList<>(); //If fields start moving positions, this can be used to dynamically set fields
    public List<City> mapCitiesFromCSV (File csvFile) throws FileNotFoundException {
      List<City> cities = new ArrayList<>();
      Scanner scanner = new Scanner(csvFile);//getting the headers;
      extractHeaders(scanner.nextLine());
      while (scanner.hasNextLine()) {
        cities.add(mapRecordToCity(scanner.nextLine()));
      }

      return cities;
    }

    private void extractHeaders(String firstLine){
      try (Scanner rowScanner = new Scanner(firstLine)) {
        rowScanner.useDelimiter(COMMA_DELIMITER);
        while (rowScanner.hasNextLine()) {
          headers.add(rowScanner.next());
        }
      }
    }

    private City mapRecordToCity(String line){
      City city = new City();
      try (Scanner rowScanner = new Scanner(line)) {
        rowScanner.useDelimiter(COMMA_DELIMITER);
        city.setId(Long.valueOf(rowScanner.next()));
        city.setName(rowScanner.next());
        city.setPhoto(rowScanner.next());
      }
      return city;
    }
}
