package com.sheru.Recipe.Api.Controller;

import com.sheru.Recipe.Api.Model.*;
import com.sheru.Recipe.Api.Service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserRequest user) {
        var response = authenticationService.registerUser(user);
        if(user.isMfaEnabled())
        {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginRequestDTO user) {
        System.out.println("Here and " + user);
        return authenticationService.loginUser(user);}

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(
            @RequestBody VerificationRequest verificationRequest
    ) {
        return ResponseEntity.ok(authenticationService.verifyCode(verificationRequest));
    }
}
