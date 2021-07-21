FROM golang:1.16.4-alpine3.13 as builder

WORKDIR /app
COPY service .
COPY conf conf
RUN go env -w GOPROXY=https://goproxy.cn
RUN go build -o app .

FROM alpine:latest
# 添加源
RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories

# 安装时区数据包
RUN apk update && apk add tzdata

# 映射时区文件
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /app
COPY --from=builder app .

ENTRYPOINT ["./app"]
