package com.jst.service;

import com.jst.model.DimRightLinkServices;

import java.util.List;

public interface DimRightLinkServicesService extends BaseService<DimRightLinkServices> {

    List serviceConfiguration(Integer rightId, Integer typeId);

    DimRightLinkServices selectByServiceId(Integer serviceId);

    void saveAndDelete(String objData);
}
