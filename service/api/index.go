package api

import (
	. "dynamic-router/service/models"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

//IndexRouter index
func IndexRouter(c *gin.Context) {
	c.String(http.StatusOK, "is ok")
}

//AddRouter addOne
func AddRouter(c *gin.Context) {
	count := RouterCount()
	if count >= 5 {
		c.JSON(http.StatusOK, gin.H{
			"msg":  "这个只是测试一下就好，不要添加太多哦~",
			"code": 101,
		})
		return
	}
	path := c.Request.FormValue("path")
	name := c.Request.FormValue("name")
	// pid := c.Request.FormValue("pid")
	// _pid, _ := strconv.Atoi(pid)
	now := time.Now().Local()
	_createDate := now.Format("2006-01-02 15:04:05")

	router := Router{
		Path:       path,
		Name:       name,
		PID:        0,
		CreateDate: _createDate,
		UpdateDate: _createDate,
	}
	id := router.Create()
	msg := fmt.Sprintf("insert successful %d", id)
	c.JSON(http.StatusOK, gin.H{
		"msg":  msg,
		"code": 100,
	})
}

//GetOne get one row
func GetOne(c *gin.Context) {
	ids := c.Param("id")
	id, _ := strconv.Atoi(ids)
	r := Router{
		ID: id,
	}
	rs, _ := r.GetRow()
	c.JSON(http.StatusOK, gin.H{
		"result": rs,
		"code":   100,
	})
}

//GetAll query all
func GetAll(c *gin.Context) {
	r := Router{}
	rs, _ := r.GetRows()
	c.JSON(http.StatusOK, gin.H{
		"body": rs,
		"code": 100,
	})
}

//UpdateUser update
func UpdateUser(c *gin.Context) {
	ids := c.Request.FormValue("id")
	id, _ := strconv.Atoi(ids)

	path := c.Request.FormValue("path")
	name := c.Request.FormValue("name")
	// pid := c.Request.FormValue("pid")
	// _pid, _ := strconv.Atoi(pid)
	now := time.Now()
	_updateDate := now.Format("2006-01-02 15:04:05")

	router := Router{
		ID:         id,
		Path:       path,
		Name:       name,
		PID:        0,
		UpdateDate: _updateDate,
	}

	row := router.Update()
	msg := fmt.Sprintf("updated successful %d", row)
	c.JSON(http.StatusOK, gin.H{
		"msg":  msg,
		"code": 100,
	})
}

//DelOne 删除一条记录
func DelOne(c *gin.Context) {
	ids := c.Request.FormValue("id")
	id, _ := strconv.Atoi(ids)
	row := Delete(id)
	msg := fmt.Sprintf("delete successful %d", row)
	c.JSON(http.StatusOK, gin.H{
		"msg":  msg,
		"code": 100,
	})
}
