package main

import (
	"dynamic-router/service/db"
	"fmt"
	"log"
	"net/http"

	mysql "dynamic-router/service/db"
	setting "dynamic-router/service/utils"

	"github.com/gin-gonic/gin"
)

func init() {
	setting.Setup()
	mysql.Setup()
}

func main() {
	defer db.SQLDB.Close()

	gin.SetMode(setting.ServerSetting.RunMode)

	routersInit := initRouter()
	readTimeout := setting.ServerSetting.ReadTimeout
	writeTimeout := setting.ServerSetting.WriteTimeout
	endPoint := fmt.Sprintf(":%d", setting.ServerSetting.Port)
	maxHeaderBytes := 1 << 20

	server := &http.Server{
		Addr:           endPoint,
		Handler:        routersInit,
		ReadTimeout:    readTimeout,
		WriteTimeout:   writeTimeout,
		MaxHeaderBytes: maxHeaderBytes,
	}

	log.Printf("[info] start http server listening %s", endPoint)

	server.ListenAndServe()
}
