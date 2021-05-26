#!/bin/sh

#ROUTER_MODE
#ROUTER_PORT
#ROUTER_DB_USER
#ROUTER_DB_PWD
#ROUTER_HOST
#ROUTER_DB_NAME

write_config() {
cat <<EOF >app.ini
[server]
RunMode = ${ROUTER_MODE}
Port = ${ROUTER_PORT}
ReadTimeout = 60
WriteTimeout = 60

[database]
Type = mysql
User = ${ROUTER_DB_USER}
Password = ${ROUTER_DB_PWD}
Host = ${ROUTER_HOST}
Name = ${ROUTER_DB_NAME}
EOF

echo ">>> write conf/app.ini"
cat app.ini
echo ">>> write conf/app.ini end"
}

rm -rf conf/app.ini
write_config
mv app.ini conf