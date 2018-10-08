package com.jst.service;

import com.jst.model.DimRightRule;

import java.util.List;

public interface DimRightRuleService  extends BaseService<DimRightRule>{
    void insertTypeByInfo(DimRightRule dimRightRule);

    void updateTypeByInfo(DimRightRule dimRightRule);

    List<DimRightRule> selectInfo(Integer rightId);

}
