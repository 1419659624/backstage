package com.jst.controller;

import com.jst.dto.RestResponseBo;
import com.jst.service.DimRightLinkServicesService;
import com.jst.utils.ResultMap;
import com.jst.vo.DimRightServiceVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/dimRightLinkServices")
public class DimRightLinkServicesControlelr {


    @Resource
    private DimRightLinkServicesService dimRightLinkServicesService;

    /**
     * 打开服务配置页面
     * @param rightId
     * @param request
     * @return
     */
   @GetMapping("/serviceConfiguration/{rightId}")
    public String ServiceConfiguration(@PathVariable(value = "rightId",required = false) Integer rightId, HttpServletRequest request){
        request.setAttribute("rightId", rightId);
        return  "admin/dimrightlinkservices/serviceinfo";
    }

    /**
     * 服务配置数据回显
     * @param request
     * @param rightId
     * @param typeId
     * @return
     */
    @GetMapping("/serviceInfo")
    @ResponseBody
    public ResultMap<List<DimRightServiceVO>> serviceInfo(HttpServletRequest request, Integer rightId, Integer typeId){
        List userList = dimRightLinkServicesService.serviceConfiguration(rightId, typeId);
        request.setAttribute("userList", userList);
        return new ResultMap<List<DimRightServiceVO>>(0,"",userList,userList.size());
    }

    /**
     * 保存或者修改数据
     * @param
     * @return
     */
    @PostMapping("/saveAndDelete")
    @ResponseBody
    public RestResponseBo saveAndUpdate(@RequestParam(value = "objData") String objData){
        dimRightLinkServicesService.saveAndDelete(objData);
        return RestResponseBo.ok();
    }
}
