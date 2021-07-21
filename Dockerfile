FROM golang:1.16.4-alpine3.13 as builder

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
COPY service .
COPY conf conf
RUN go env -w GOPROXY=https://goproxy.cn
RUN go build -o app .

FROM alpine:latest

WORKDIR /app
COPY --from=builder app .

ENTRYPOINT ["./app"]