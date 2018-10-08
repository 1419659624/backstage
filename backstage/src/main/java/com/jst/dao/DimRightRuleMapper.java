package com.jst.dao;

import com.jst.model.DimRightRule;

import java.util.List;

public interface DimRightRuleMapper extends BaseMapper<DimRightRule>{

    void insertTypeByMember(DimRightRule dimRightRule);

    void insertTypeByRetinue(DimRightRule dimRightRule);

    void updateTypeByMember(DimRightRule dimRightRule);

    void updateTypeByRetinue(DimRightRule dimRightRule);

    List selectInfo(Integer rightId);
}