package com.api.develcadastro.controller;

import com.api.develcadastro.dto.UserDTO;
import com.api.develcadastro.model.UserModel;
import com.api.develcadastro.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping(value = "/create")
    public ResponseEntity<Object> saveUser(@RequestBody @Valid UserDTO userDTO) {

        var userModel = new UserModel();
        BeanUtils.copyProperties(userDTO, userModel);

//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/MM/yyyy");
//        userModel.setBirthDate(LocalDate.parse(userDTO.getBirthDate(), formatter));

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userModel));

    }

    @GetMapping
    public ResponseEntity<List<UserModel>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUser(
            @PathVariable(value = "id")
            UUID id
    ) {
        Optional<UserModel> userModelOptional = userService.findById(id);
        if (!userModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(userModelOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable(value = "id") UUID id,
                                                   @Valid @RequestBody UserDTO userDetails) {
        Optional<UserModel> userModelOptional = userService.findById(id);
        if (!userModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        BeanUtils.copyProperties(userDetails, userModelOptional.get());

        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/MM/yyyy");
        //userModelOptional.get().setBirthDate(LocalDate.parse(userDetails.getBirthDate(), formatter));

       UserModel updatedUser = userService.save(userModelOptional.get());

        return ResponseEntity.ok(updatedUser);
    }
}
