package com.garret.dreammoa.dto.reponsedto;

public class SuccessResponse {
    private String message;

    public SuccessResponse() {}

    public SuccessResponse(String message) {
        this.message = message;
    }

    // Getter and Setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}