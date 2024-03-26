package com.web.config;


import com.cloudinary.Cloudinary;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@SpringBootApplication
public class CloudConfig {

    @Bean
    public Cloudinary cloudinaryConfigs() {
        Cloudinary cloudinary = null;
        Map config = new HashMap();
        config.put("cloud_name", "dlhxe4j2h");
        config.put("api_key", "252252943143658");
        config.put("api_secret", "_NN0JV6KSsOzzVYkWPv0P_FdaTg");
        cloudinary = new Cloudinary(config);
        return cloudinary;
    }

}
