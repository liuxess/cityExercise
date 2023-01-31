package com.helmes.cities.configuration;

import static org.springframework.security.crypto.factory.PasswordEncoderFactories.createDelegatingPasswordEncoder;

import enums.UserRole;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration{

  @Bean
  public InMemoryUserDetailsManager userDetailsService(PasswordEncoder passwordEncoder) {
    UserDetails user = User.withUsername("User")
        .password(passwordEncoder.encode("Password1"))
        .roles(UserRole.DEFAULT.toString())
        .build();

    UserDetails admin = User.withUsername("Editor")
        .password(passwordEncoder.encode("Password2"))
        .roles(UserRole.DEFAULT.toString(), UserRole.ALLOW_EDIT.toString())
        .build();

    return new InMemoryUserDetailsManager(user, admin);
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .cors().disable()
        .authorizeHttpRequests()
        .requestMatchers("api/*")
        .hasRole(UserRole.DEFAULT.toString())
        .requestMatchers("api/cities/edit")
        .hasRole(UserRole.ALLOW_EDIT.toString())
        .requestMatchers("login", "/api/success").permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .formLogin().loginProcessingUrl("/login").successForwardUrl("/api/roles")
        .and()
        .logout().logoutUrl("/logout").deleteCookies("JSESSIONID").logoutSuccessUrl("/api/success")
        .and()
        .exceptionHandling().authenticationEntryPoint(new Http403ForbiddenEntryPoint());
    return http.build();

  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return createDelegatingPasswordEncoder();
  }

}
