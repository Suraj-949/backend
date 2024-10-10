package com.example.chatapp.model;

import javax.persistence.*;

@Entity
@Table(name = "video_notes")
public class VideoNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String videoUrl;
    private String sender;
    private String recipient;

    // Getters and Setters
    // ...
}
