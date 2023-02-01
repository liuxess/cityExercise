package com.helmes.cities.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BasicControllerTest {

  private final static String SUCCESS_ROUTE = "/api/success";

  @Autowired
  private MockMvc mvc;

  private BasicController basicController;

  @BeforeEach
  public void init(){
    basicController = new BasicController();
  }

  @Test
  void successSanityCheck() {
    basicController.success(); //no problems
  }

  @WithAnonymousUser
  @Test
  public void anonymousForbiddenWhenCallingForSuccess() throws Exception {
    mvc.perform(get(SUCCESS_ROUTE)).andExpect(status().isForbidden());
  }

  @WithMockUser(roles = {"DEFAULT"})
  @Test
  public void noProblemsWhenDefaultUserCalls() throws Exception {
    mvc.perform(get(SUCCESS_ROUTE)).andExpect(status().isOk());
  }
  @WithMockUser(roles = {"ALLOW_EDIT", "DEFAULT"})
  @Test
  public void noProblemsWhenEditorCalls() throws Exception {
    mvc.perform(get(SUCCESS_ROUTE)).andExpect(status().isOk());
  }
}