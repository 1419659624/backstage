package com.jst.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.jst.dao.DimRightLinkServicesMapper;
import com.jst.model.DimRightLinkServices;
import com.jst.service.DimRightLinkServicesService;
import com.jst.utils.HttpClientUtil;
import com.jst.vo.DimRightServiceVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DimRightLinkServicesServiceImpl extends BaseServiceImpl<DimRightLinkServices> implements DimRightLinkServicesService {

    @Resource
    private DimRightLinkServicesMapper dimRightLinkServicesMapper;

    @Override
    public List serviceConfiguration(Integer rightId, Integer typeId) {
        Map map=new HashMap();
        map.put("rightId", rightId);
        map.put("typeId", typeId);
        String jsonStr = new HttpClientUtil().doPost("接口地址", map,"utf-8");

        List<DimRightServiceVO> list=new ArrayList<DimRightServiceVO>();
        for (int i = 137; i < 140; i++) {
            DimRightServiceVO dimRightServiceVO =new DimRightServiceVO();
            dimRightServiceVO.setServiceId(i);
            dimRightServiceVO.setServiceName("张三"+i);
            list.add(dimRightServiceVO);
        }
        Gson gson = new Gson();
        String objectStr = gson.toJson(list);//把对象转为JSON格式的字符串
        System.out.println("把对象转为JSON格式的字符串///  "+objectStr);
        // fromJson 将json字符串转为bean对象
        List<DimRightServiceVO> retList = gson.fromJson(objectStr,new TypeToken<List<DimRightServiceVO>>(){}.getType());
        for (int i = 0; i < retList.size(); i++) {
            DimRightLinkServices dimRightLinkServices = dimRightLinkServicesMapper.selectByServiceId(retList.get(i).getServiceId());
            if(dimRightLinkServices!=null){
                retList.get(i).setLay_checked(true);
            }
        }
        return retList;
    }

    @Override
    public DimRightLinkServices selectByServiceId(Integer serviceId) {
        return dimRightLinkServicesMapper.selectByServiceId(serviceId);
    }

    @Override
    public void saveAndDelete(String objData) {
        Gson gson = new Gson();
        List<DimRightServiceVO> dimRightServiceVOList = gson.fromJson(objData, new TypeToken<ArrayList<DimRightServiceVO>>() {
        }.getType());
        for (int i = 0; i <dimRightServiceVOList.size() ; i++) {
            if(dimRightServiceVOList.get(i).getLAY_CHECKED().equals("true")){
                DimRightLinkServices dimRightLinkServices = dimRightLinkServicesMapper.selectByServiceId(dimRightServiceVOList.get(i).getServiceId());
                if(dimRightLinkServices==null) {
                    System.out.println("增加" + dimRightServiceVOList.get(i).getServiceId());
                    //   dimRightLinkServicesService.insert();
                }
            }else{
                //   dimRightLinkServicesService.delete();
                System.out.println("删除"+dimRightServiceVOList.get(i).getServiceId());
            }
        }
    }
}
