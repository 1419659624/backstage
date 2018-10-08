package com.jst.service.impl;

import com.jst.dao.DimRightRuleMapper;
import com.jst.model.DimRightRule;
import com.jst.service.DimRightRuleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DimRightRuleServiceImpl extends BaseServiceImpl<DimRightRule> implements DimRightRuleService {

    @Resource
    private DimRightRuleMapper dimRightRuleMapper;


    public void insertTypeByInfo(DimRightRule dimRightRule){
        dimRightRuleMapper.insertTypeByMember(dimRightRule);
        dimRightRuleMapper.insertTypeByRetinue(dimRightRule);
    }

    @Override
    public void updateTypeByInfo(DimRightRule dimRightRule) {
            dimRightRuleMapper.updateTypeByMember(dimRightRule);
            dimRightRuleMapper.updateTypeByRetinue(dimRightRule);
        }


    @Override
    public List<DimRightRule> selectInfo(Integer rightId) {
        return dimRightRuleMapper.selectInfo(rightId);
    }


}
