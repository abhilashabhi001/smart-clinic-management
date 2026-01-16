package com.smartclinic.backend.auth.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    // ✅ Secure key (256-bit)
    private final SecretKey secretKey =
            Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    /* -------------------------
       Generate JWT
    -------------------------- */
    public String generateToken(String subject, String role) {

        return Jwts.builder()
                .setSubject(subject)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    /* -------------------------
       Validate JWT
    -------------------------- */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            return true; // ✅ valid token
        } catch (JwtException | IllegalArgumentException e) {
            return false; // ❌ invalid / expired / tampered
        }
    }

    /* -------------------------
       Extract Claims
    -------------------------- */
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public String extractSubject(String token) {
        return extractClaims(token).getSubject();
    }
}
