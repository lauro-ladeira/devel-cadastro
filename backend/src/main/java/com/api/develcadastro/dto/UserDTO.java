package com.api.develcadastro.dto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

public class UserDTO {
    @NotBlank
    private String name;

    @NotBlank
    private String profilePhoto;

    @NotBlank
    private String birthDate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }
}
