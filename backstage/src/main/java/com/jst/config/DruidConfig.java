package com.jst.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.druid.filter.Filter;
import com.alibaba.druid.filter.stat.StatFilter;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.google.common.collect.Lists;

@Configuration
public class DruidConfig {

    @ConfigurationProperties(prefix="spring.druid")
    @Bean(initMethod="init",destroyMethod="close")
    public DruidDataSource dataSource(){
        DruidDataSource dataSource=new DruidDataSource();
        dataSource.setProxyFilters(Lists.newArrayList(statFilter()));
        return dataSource;
    }

    @Bean
    public Filter statFilter(){
        StatFilter statFilter=new StatFilter();
        statFilter.setSlowSqlMillis(1);
        statFilter.setLogSlowSql(true);//打印日志
        statFilter.setMergeSql(true);//合并日志
        return statFilter;
    }

    @Bean
    public ServletRegistrationBean servletRegistrationBean(){
        return new ServletRegistrationBean(new StatViewServlet(), "/druid/*");
    }

}