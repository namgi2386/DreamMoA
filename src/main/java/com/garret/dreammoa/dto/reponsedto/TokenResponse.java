package com.garret.dreammoa.dto.reponsedto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenResponse {
    private String accessToken; // accessToken
    private String refreshToken; // refreshToken
    private String profilePictureUrl; // Image url

    public TokenResponse(String accessToken, String refreshToken, String profilePictureUrl) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.profilePictureUrl = profilePictureUrl;
    }
}
