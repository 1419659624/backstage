package com.jst.model;

import com.jst.utils.DateUtil;

public class DimRight {
    private Integer rightId;

    private String rightName;

    private String desc;

    private Integer parentRightId;

    private Double price;

    private Integer rightTypeId;

    private Integer groupId;

    private Integer sort;

    private Boolean checked;

    private Boolean readonly;

    private Integer insNumber;

    private Integer inDiscount;

    private Integer outDiscount;

    private String createTime;

    private String updateTime;

    private String deleteTime;

    private Integer weight;


    public Integer getRightId() {
        return rightId;
    }

    public void setRightId(Integer rightId) {
        this.rightId = rightId;
    }

    public String getRightName() {
        return rightName;
    }

    public void setRightName(String rightName) {
        this.rightName = rightName == null ? null : rightName.trim();
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc == null ? null : desc.trim();
    }

    public Integer getParentRightId() {
        return parentRightId;
    }

    public void setParentRightId(Integer parentRightId) {
        this.parentRightId = parentRightId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getRightTypeId() {
        return rightTypeId;
    }

    public void setRightTypeId(Integer rightTypeId) {
        this.rightTypeId = rightTypeId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public Boolean getReadonly() {
        return readonly;
    }

    public void setReadonly(Boolean readonly) {
        this.readonly = readonly;
    }

    public Integer getInsNumber() {
        return insNumber;
    }

    public void setInsNumber(Integer insNumber) {
        this.insNumber = insNumber;
    }

    public Integer getInDiscount() {
        return inDiscount;
    }

    public void setInDiscount(Integer inDiscount) {
        this.inDiscount = inDiscount;
    }

    public Integer getOutDiscount() {
        return outDiscount;
    }

    public void setOutDiscount(Integer outDiscount) {
        this.outDiscount = outDiscount;
    }

    public String getCreateTime() {
        return DateUtil.timeStamp2Date(String.valueOf(createTime),null);
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(String deleteTime) {
        this.deleteTime = deleteTime;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }
}