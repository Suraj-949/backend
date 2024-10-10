package com.example.chatapp.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String recipient;
    private String content;

    @Column(name = "sent_time")
    private LocalDateTime sentTime;

    // Getters and Setters
    // ...
}
