# 动态路由

> 当前开发&部署环境为 Linux发行版  **Manjaro**
>
> 命令操作以Linux为准

#### 文档
[文档](dynamic.md)


#### 前端

> vue-element-admin
>
> 目录 **dynamic-router/page**



##### 启动

```shell
npm install && npm run dev
#或者
yarn && yarn dev
```

##### 编译打包

```shell
npm run build
#或者
yarn build
```



#### 后端

> Go 1.3+、Gin、Mysql5.6
>
> 目录 dynamic-router/service

##### 启动

```shell
ROUTER_MODE=release \
ROUTER_PORT=8082 \
ROUTER_DB_USER=root \
ROUTER_DB_PWD=123456 \
ROUTER_HOST=192.168.1.129:3306 \
ROUTER_DB_NAME=dynamic_router \
./script/generateConfig.sh && \
go run *.go
```

##### 编译

> window 64

```shell
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .
```

> Linux alias -> app

```shell
go build -o app
```



#### 容器化

> 默认提供了一个可执行的二进制文件
>
> 在目录 **dynamic-router/page**下
>
> 需要提前安装 **docker**和 **docker-compose**

##### 部署shell

```shell
cd page \
./deploy.sh # start | restart => default: start
```

##### Mysql

> 默认访问本地**129**服务器。
>
> 如果需要替换，需要修改 **conf/app.ini**
>
> 脚本文件 **dynamic-router/service/dynamic_router.sql**

##### 访问

> 端口号为 12333
>
> http://ip:12333



#### windows环境

> 在 **dynamic/service**目录下我默认提供了一个 .exe的window环境下可执行文件。
>
> 复制 **conf**和 **service.exe**文件，并放到同一个目录下，直接启动就可以了。
>
> 这样前端运行起来，默认访问服务端 **8082**端口，项目正常运行。


#### 服务器环境部署
> 以Contos7 为例
> 前置条件 Node14+、 Docker
> 项目clone下来，直接在项目根目录运行 bash ./deploy.sh
> 生成默认端口为 9000, 可以根据需求 修改 deploy.sh 文件