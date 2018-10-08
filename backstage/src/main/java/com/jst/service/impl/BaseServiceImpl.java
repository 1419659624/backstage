package com.jst.service.impl;

import com.jst.dao.BaseMapper;
import com.jst.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    protected BaseMapper<T> baseMapper;

 /*   private Class<?> clazz = null;

    protected Class<?> getEntityClass() {
        if (clazz == null) {
            clazz = (Class<?>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        }
        return clazz;
    }*/


    @Override
    public List<T> selectByCondition(Map map) {
        return baseMapper.selectByCondition(map);
    }

    @Override
    public int deleteByPrimaryKey(Object primaryKey) {
        return baseMapper.deleteByPrimaryKey(primaryKey);
    }


    @Override
    public int insert(T entity) {
        return baseMapper.insert(entity);
    }

    @Override
    public int insertSelective(T entity) {
        return baseMapper.insertSelective(entity);
    }

    @Override
    public T selectByPrimaryKey(Object primaryKey) {
        return baseMapper.selectByPrimaryKey(primaryKey);
    }


    @Override
    public int updateByPrimaryKeySelective(T entity) {
        return baseMapper.updateByPrimaryKeySelective(entity);
    }

    @Override
    public int updateByPrimaryKey(T entity) {
        return baseMapper.updateByPrimaryKey(entity);
    }


}
