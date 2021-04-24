package com.example.zed.service;


import com.example.zed.dto.RegisterRequest;
import com.example.zed.model.NotificationEmail;
import com.example.zed.model.User;
import com.example.zed.model.VerificationToken;
import com.example.zed.repository.UserRepository;
import com.example.zed.repository.VerificationTokenRepository;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;


import static java.time.Instant.now;
@Service
@AllArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder  passwordEncoder;
    private final VerificationTokenRepository verificationTokenRepository ;
    private final MailService mailService;

    @Transactional // to interacting with relational DB
    public void signup(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode( registerRequest.getPassword()));
        user.setCreated(now());
        user.setEnabled(false);
        userRepository.save(user);
        log.info("User Registered Successfully, Sending Authentication Email");

        String token = generateVerificationToken(user);
        mailService.sendMail(new NotificationEmail("please activate your account " ,
                user.getEmail(),
                "Thank you for signing up to Spring Reddit, please click on the below url to activate your account :"+
                        "http://localhost:8080/api/auth/accountVerification"+token));
//        String message = mailContentBuilder.build("Thank you for signing up to Spring Reddit, please click on the below url to activate your account : "
//                + ACTIVATION_EMAIL + "/" + token);

    }

    private String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationTokenRepository.save(verificationToken);
        return token;
    }
}
