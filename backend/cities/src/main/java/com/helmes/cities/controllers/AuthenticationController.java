package com.helmes.cities.controllers;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api")
public class AuthenticationController {

  @PostMapping("/roles")
  public Collection<? extends GrantedAuthority> logIn(){
    return SecurityContextHolder.getContext().getAuthentication().getAuthorities();
  }

}
