package com.jst.vo;

public class DimRightServiceVO {
    private Integer serviceId;
    private String serviceName;
    private boolean lay_checked;
    private boolean lay_table_index;
    private String LAY_CHECKED;
    private String LAY_TABLE_INDEX;

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }


    public boolean isLay_checked() {
        return lay_checked;
    }

    public void setLay_checked(boolean lay_checked) {
        this.lay_checked = lay_checked;
    }

    public boolean isLay_table_index() {
        return lay_table_index;
    }

    public void setLay_table_index(boolean lay_table_index) {
        this.lay_table_index = lay_table_index;
    }

    public String getLAY_TABLE_INDEX() {
        return LAY_TABLE_INDEX;
    }

    public void setLAY_TABLE_INDEX(String LAY_TABLE_INDEX) {
        this.LAY_TABLE_INDEX = LAY_TABLE_INDEX;
    }

    public String getLAY_CHECKED() {
        return LAY_CHECKED;
    }

    public void setLAY_CHECKED(String LAY_CHECKED) {
        this.LAY_CHECKED = LAY_CHECKED;
    }
}
