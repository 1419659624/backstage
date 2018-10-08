package com.jst.exception;

public class CCException extends RuntimeException {

	public CCException() {
	}

	public CCException(String message) {
		super(message);
	}

	public CCException(String message, Throwable cause) {
		super(message, cause);
	}

	public CCException(Throwable cause) {
		super(cause);
	}

}