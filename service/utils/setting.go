package utils

import (
	"log"
	"time"

	"github.com/go-ini/ini"
)

//Server Server
type Server struct {
	RunMode      string
	Port         int
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

//ServerSetting ServerSetting
var ServerSetting = &Server{}

//Database Database
type Database struct {
	Type     string
	User     string
	Password string
	Host     string
	Name     string
}

//DatabaseSetting setting
var DatabaseSetting = &Database{}

var cfg *ini.File

// Setup initialize the configuration instance
func Setup() {
	var err error
	cfg, err = ini.Load("conf/app.ini")
	if err != nil {
		log.Fatalf("setting.Setup, fail to parse 'conf/app.ini': %v", err)
	}

	mapTo("server", ServerSetting)
	mapTo("database", DatabaseSetting)

	ServerSetting.ReadTimeout = ServerSetting.ReadTimeout * time.Second
	ServerSetting.WriteTimeout = ServerSetting.WriteTimeout * time.Second
}

// mapTo map section
func mapTo(section string, v interface{}) {
	err := cfg.Section(section).MapTo(v)
	if err != nil {
		log.Fatalf("Cfg.MapTo %s err: %v", section, err)
	}
}
