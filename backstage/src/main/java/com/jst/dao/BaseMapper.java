package com.jst.dao;

import com.baomidou.mybatisplus.mapper.Wrapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

public interface BaseMapper<T> {
    List<T> selectByCondition(Map map);

    int deleteByPrimaryKey(Object primaryKey);

    int insert(T entity);

    int insertSelective(T entity);

    T selectByPrimaryKey(Object primaryKey);

    int updateByPrimaryKeySelective(T entity);

    int updateByPrimaryKey(T entity);

    List<T> selectPage(RowBounds var1, @Param("ew") Wrapper<T> var2);
}
