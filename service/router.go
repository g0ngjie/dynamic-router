package main

import (
	"dynamic-router/service/api"
	cors "dynamic-router/service/middleware"

	"github.com/gin-gonic/gin"
)

// initRouter
func initRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/", api.IndexRouter)

	//路由群组
	users := router.Group("api/router")
	users.Use(cors.Cors())
	{
		users.GET("", api.GetAll)
		users.POST("/add", api.AddRouter)
		users.GET("/get/:id", api.GetOne)
		users.POST("/update", api.UpdateUser)
		users.POST("/del", api.DelOne)
	}

	return router
}
