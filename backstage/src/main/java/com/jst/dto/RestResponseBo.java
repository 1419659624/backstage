package com.jst.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RestResponseBo<T> {

    private T datas;
    private boolean success;
    private String msg;
    private int code = 0;
    private String url;

    public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
    private long timestamp;

    public RestResponseBo() {
        this.timestamp = System.currentTimeMillis() / 1000;
    }

    public RestResponseBo(boolean success) {
        this.timestamp = System.currentTimeMillis() / 1000;
        this.success = success;
    }

    public RestResponseBo(boolean success, T payload) {
        this.timestamp = System.currentTimeMillis() / 1000;
        this.success = success;
        this.datas = payload;
    }

    public RestResponseBo(boolean success, T payload, int code) {
        this.timestamp = System.currentTimeMillis() / 1000;
        this.success = success;
        this.datas = payload;
        this.code = code;
    }

    public RestResponseBo(boolean success, String msg) {
        this.timestamp = System.currentTimeMillis() / 1000;
        this.success = success;
        this.msg = msg;
    }

    public RestResponseBo(boolean success, String msg, int code) {
        this.timestamp = System.currentTimeMillis() / 1000;
        this.success = success;
        this.msg = msg;
        this.code = code;
    }

    public T getDatas() {
        return datas;
    }

    public void setDatas(T datas) {
        this.datas = datas;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
 
	public static RestResponseBo ok() {
    	RestResponseBo resp = new RestResponseBo(true);
    	resp.setCode(1);
    	return resp;
    }
     
	public static RestResponseBo ok(String msg) {
    	RestResponseBo resp = new RestResponseBo(true);
    	resp.setCode(1);
    	resp.setMsg(msg);
    	return resp;
    }
     
	public static RestResponseBo ok(String msg, String url) {
    	RestResponseBo resp = new RestResponseBo(true);
    	resp.setCode(1);
    	resp.setMsg(msg);
    	resp.setUrl(url);
    	return resp;
    }
     
	public static  <T>  RestResponseBo ok(String msg, String url, T payload) {
    	RestResponseBo resp = new RestResponseBo(true, payload);
    	resp.setCode(1);
    	resp.setMsg(msg);
    	resp.setUrl(url);
    	return resp;
    }
   
	public static RestResponseBo fail() {
        return new RestResponseBo(false);
    }
 
	public static RestResponseBo fail(String msg) {
        return new RestResponseBo(false, msg);
    }
  

}