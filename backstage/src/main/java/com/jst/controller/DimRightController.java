package com.jst.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.jst.dto.RestResponseBo;
import com.jst.model.DimRight;
import com.jst.service.DimRightService;
import com.jst.utils.Pager;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/dimright")
public class DimRightController {

    @Resource
    private DimRightService dimRightService;

    /**
     * 查询所有数据
     * @param request
     * @return
     */
    @GetMapping("/selectList")
    public String selectList(@RequestParam(value = "pageNum", defaultValue = "1") int pageNum,
                             @RequestParam(value = "pageSize", defaultValue = "15") int pageSize,
                             HttpServletRequest request, String keys,Map map){
        map.put("keys",keys);
        Pager pager=new Pager();
        Page<?> page = PageHelper.startPage(pageNum, pageSize);
        List<DimRight> dimRightList = dimRightService.selectByCondition(map);
        request.setAttribute("dimRightList",dimRightList);
        request.setAttribute("keys",keys);
        request.setAttribute("pager", pager.getPage(page));
        request.setAttribute("url", "/dimright/selectList");
        return "admin/dimright/index";
    }

    /**
     * 根据id查询数据
     * @param request
     * @return
     */
    @GetMapping("/updateAndInster/{rightId}")
    public String updateAndInster(@PathVariable("rightId") Integer rightId, HttpServletRequest request) {
        DimRight dimRight = dimRightService.selectByPrimaryKey(rightId);
        request.setAttribute("info", dimRight);
        return "admin/dimright/info";
    }

    /**
     * 保存或者修改数据
     * @param
     * @return
     */
    @PostMapping("/saveAndUpdate")
    @ResponseBody
    public RestResponseBo saveAndUpdate(DimRight dimRight, String flag){
        dimRight.setUpdateTime(String.valueOf(new Date().getTime()).substring(0,10));
            if(StringUtils.isNotEmpty(flag)){
                if(dimRightService.selectByPrimaryKey(dimRight.getRightId())!=null){
                    return RestResponseBo.fail("权益编号已存在!");
                }
                Map map=new HashMap();
                map.put("rightName",dimRight.getRightName());
                List<DimRight> dimRightList = dimRightService.selectByCondition(map);
                if(dimRightList.size()>0){
                    return RestResponseBo.fail("权益名称已存在!");
                }
                dimRightService.insertSelective(dimRight);
            }else {
                dimRightService.updateByPrimaryKeySelective(dimRight);
            }
        return RestResponseBo.ok();
    }




}
