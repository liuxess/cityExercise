package com.helmes.cities.controllers;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

class BasicControllerTest {

  private BasicController basicController;

  @BeforeEach
  public void init(){
    basicController = new BasicController();
  }

  @Test
  void successSanityCheck() {
    basicController.success(); //no problems
  }
}