package com.tada.summerboot.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
	public void addViewControllers(ViewControllerRegistry registry) {
		//Map the browser's URL to a specific View (HTML) inside resources/templates directory
		registry.addViewController("/hello").setViewName("hello");
		registry.addViewController("/error").setViewName("error");

		//Just to demo fragments
		registry.addViewController("/fragment1").setViewName("fragment1");
		registry.addViewController("/fragment2").setViewName("fragment2");

		registry.addViewController("/home").setViewName("home");
		registry.addViewController("/UserDetailsService()").setViewName("UserDetailsService()");
		registry.addViewController("/about").setViewName("about");
		registry.addViewController("/services").setViewName("services");
		registry.addViewController("/gallery_architecture").setViewName("gallery_architecture");
		registry.addViewController("/gallery_drone").setViewName("gallery_drone");
		registry.addViewController("/gallery_studio").setViewName("gallery_studio");
		registry.addViewController("/gallery_product").setViewName("gallery_product");
		registry.addViewController("/gallery_outdoors").setViewName("gallery_outdoors");
		registry.addViewController("/gallery_wedding").setViewName("gallery_wedding");
		registry.addViewController("/paymentSuccess").setViewName("paymentSuccess");
		registry.addViewController("/cart").setViewName("cart");
		registry.addViewController("/view-cart").setViewName("view-cart");

	}

}
