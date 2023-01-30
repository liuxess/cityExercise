package com.helmes.cities.models.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
@AllArgsConstructor
public class CityRequestConfiguration {
  private int page;
  private int size;
  private String search;
}
