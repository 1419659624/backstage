package com.jst.controller;

import com.jst.model.DimRight;
import com.jst.service.DimRightService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DimRightControllerTest {

    @Autowired
    private DimRightService dimRightService;

    @Test
    public void updateAndInster() {
        DimRight dimRight = dimRightService.selectByPrimaryKey(100000);
    }
}