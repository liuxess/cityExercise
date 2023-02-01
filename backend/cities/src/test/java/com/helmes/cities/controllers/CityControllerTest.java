package com.helmes.cities.controllers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.helmes.cities.models.entities.City;
import com.helmes.cities.models.requests.CityRequestConfiguration;
import com.helmes.cities.services.CityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class CityControllerTest { // data should just pass through

  private final static String UPDATE_PATH = "/api/cities/edit";
  private final static String CITY_PAGE_PATH = "/api/cities/";

  private final static String CITY_REQUEST_JSON = """
                                                  {"page":"0",
                                                   "size": "10",
                                                   "search": ""
                                                  }""";
  private final static String CITY_JSON = """
                                            {"id":"0",
                                             "name":"Tokyo",
                                             "photo":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/500px-Skyscrapers_of_Shinjuku_2009_January.jpg"
                                             }""";

  @Autowired
  private MockMvc mvc;

  @Mock
  private CityService cityService;

  private CityController cityController;

  @BeforeEach
  public void init(){
    cityController = new CityController(cityService);
  }

  @Test
  public void gettingCityPageSanityCheck() {
    CityRequestConfiguration cityRequestConfiguration = new CityRequestConfiguration(0,0,"");
    Page<City> expectedPage = Page.empty();
    when(cityService.getCityPage(cityRequestConfiguration)).thenReturn(expectedPage);
    Page<City> returnedPage = cityController.getCityPage(cityRequestConfiguration);
    assertSame(expectedPage, returnedPage);
  }

  @Test
  public void updateCitySanityCheck() {
    City toUpdate = new City(); //can leave empty, no data manipulation
    doNothing().when(cityService).updateCity(toUpdate);
    cityController.updateCity(toUpdate);
  }

  @WithAnonymousUser
  @Test
  public void shouldBeUnauthorizedForAllEndpoints() throws Exception {
    mvc.perform(post(CITY_PAGE_PATH).contentType(MediaType.APPLICATION_JSON).content(CITY_REQUEST_JSON)).andExpect(status().isForbidden());
    mvc.perform(put(UPDATE_PATH).contentType(MediaType.APPLICATION_JSON).content(CITY_JSON)).andExpect(status().isForbidden());
  }

  @WithMockUser(roles = {"DEFAULT"})
  @Test
  public void defaultUserShouldBeAbleToRetrieveButNotUpdate() throws Exception {
    mvc.perform(post(CITY_PAGE_PATH).contentType(MediaType.APPLICATION_JSON).content(CITY_REQUEST_JSON)).andExpect(status().isOk());
    mvc.perform(put(UPDATE_PATH).contentType(MediaType.APPLICATION_JSON).content(CITY_JSON)).andExpect(status().isForbidden());
  }

  @WithMockUser(roles = {"ALLOW_EDIT", "DEFAULT"} )
  @Test
  public void editorUserShouldBeAbleToRetrieveAndUpdate() throws Exception {
    mvc.perform(post(CITY_PAGE_PATH).contentType(MediaType.APPLICATION_JSON).content(CITY_REQUEST_JSON)).andExpect(status().isOk());
    mvc.perform(put(UPDATE_PATH).contentType(MediaType.APPLICATION_JSON).content(CITY_JSON)).andExpect(status().isOk());
  }
}