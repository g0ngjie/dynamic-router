#!/bin/sh

#此配置文件只做本地调试用，线上环境 只需要添加对应环境变量，通过generateConfig.sh 生成 app.ini
#ROUTER_MODE=release|debug
export ROUTER_MODE=release
export ROUTER_PORT=8082
export ROUTER_DB_USER=root
export ROUTER_DB_PWD=123456
export ROUTER_HOST=192.168.1.129:3306
export ROUTER_DB_NAME=dynamic_router
bash $PWD/script/generateConfig.sh