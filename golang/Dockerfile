
FROM golang:1.21.3


WORKDIR /app


COPY go.mod go.sum ./


RUN go mod download


COPY . .

# Build the Go app
RUN go build -o main .


EXPOSE 3001


CMD ["./main"]
