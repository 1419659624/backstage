package com.jst.controller;

import com.jst.dto.RestResponseBo;
import com.jst.model.DimRightRule;
import com.jst.service.DimRightRuleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/dimrightrule")
public class DimRightRuleController {

    @Resource
    private DimRightRuleService dimRightRuleService;

    /**
     * 打开设置权益规则页面
     * @param rightId
     * @return
     */
    @GetMapping("/openRules/{id}")
    public String openRules(@PathVariable(value = "id") Integer rightId, HttpServletRequest request){
        List<DimRightRule> rightRuleList = dimRightRuleService.selectInfo(rightId);
        request.setAttribute("rightId",rightId );
        if(rightRuleList.size()>0) {
            request.setAttribute("cardSes", rightRuleList.get(0).getCardSe());
            request.setAttribute("cardSe", rightRuleList.get(1).getCardSe());
        }
        return  "admin/dimright/rulesinfo";
    }

    /**
     * 保存会员权益
     * @param dimRightRule
     * @param map
     * @return
     */
    @PostMapping("/saveRules")
    @ResponseBody
    public RestResponseBo saveAndUpdate(DimRightRule dimRightRule , Map map){
        map.put("rightId", dimRightRule.getRightId());
        List<DimRightRule> rightRuleList = dimRightRuleService.selectByCondition(map);
        if(rightRuleList.size()>0){
            dimRightRuleService.updateTypeByInfo(dimRightRule);
        }else {
            dimRightRuleService.insertTypeByInfo(dimRightRule);
        }
        return  RestResponseBo.ok();
    }


}
