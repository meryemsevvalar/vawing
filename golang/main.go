package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/segmentio/kafka-go"
)

func main() {
	kafkaURL := os.Getenv("KAFKA_BROKER")
	topic := "nodejs-to-go"

	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{kafkaURL},
		GroupID:  "go-group",
		Topic:    topic,
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	})

	go func() {
		for {
			m, err := r.ReadMessage(context.Background())
			if err != nil {
				log.Fatalf("could not read message: %v", err)
			}
			log.Printf("Received message: %s", string(m.Value))
		}
	}()

	http.HandleFunc("/response", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Message received and processed by Go app")
	})

	port := "3001"
	fmt.Printf("Server is running on port %s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
