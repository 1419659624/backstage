package com.jst.dao;

import com.jst.model.DimRightLinkServices;

public interface DimRightLinkServicesMapper extends BaseMapper<DimRightLinkServices>{

    DimRightLinkServices selectByServiceId(Integer serviceId);

}