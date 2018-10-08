package com.jst.service;

import java.util.List;
import java.util.Map;
public interface BaseService<T> {
    List<T> selectByCondition(Map map);

    int deleteByPrimaryKey(Object  primaryKey);

    int insert(T entity);

    int insertSelective(T entity);

    T selectByPrimaryKey(Object  primaryKey);

    int updateByPrimaryKeySelective(T entity);

    int updateByPrimaryKey(T entity);

}
