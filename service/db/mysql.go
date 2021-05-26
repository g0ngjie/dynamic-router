package db

import (
	"database/sql"
	"fmt"
	"log"

	setting "dynamic-router/service/utils"

	_ "github.com/go-sql-driver/mysql"
)

//SQLDB SQLDB
var SQLDB *sql.DB

//Setup Setup
func Setup() {
	var err error

	SQLDB, err = sql.Open(setting.DatabaseSetting.Type, fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		setting.DatabaseSetting.User,
		setting.DatabaseSetting.Password,
		setting.DatabaseSetting.Host,
		setting.DatabaseSetting.Name))

	if err != nil {
		log.Fatal(err.Error())
	}
	err = SQLDB.Ping()
	if err != nil {
		log.Fatal(err.Error())
	}
}
