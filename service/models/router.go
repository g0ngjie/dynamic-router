package models

import (
	"dynamic-router/service/db"
	"log"
)

// Router struct
type Router struct {
	ID         int    `json:"id" form:"id"`
	Path       string `json:"path" from:"path"`
	Name       string `json:"name" form:"name"`
	PID        int    `json:"pid" form:"pid"`
	CreateDate string `json:"createDate" form:"createDate"`
	UpdateDate string `json:"updateDate" form:"updateDate"`
}

//Create schema
func (router *Router) Create() int64 {
	rs, err := db.SQLDB.Exec("INSERT into router (path, name, pid, createDate, updateDate) value (?,?,?,?,?)", router.Path, router.Name, router.PID, router.CreateDate, router.UpdateDate)
	if err != nil {
		log.Fatal(err)
	}
	id, err := rs.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}
	return id
}

//GetRow queryOne
func (router *Router) GetRow() (r Router, err error) {
	r = Router{}
	err = db.SQLDB.QueryRow("select id,path,name,pid,createDate,updateDate from router where id = ?", router.ID).Scan(&r.ID, &r.Path, &r.Name, &r.PID, &r.CreateDate, &r.UpdateDate)
	return
}

//GetRows queryAll
func (router *Router) GetRows() (routers []Router, err error) {
	rows, err := db.SQLDB.Query("select id,path,name,pid,createDate,updateDate from router")
	for rows.Next() {
		router := Router{}
		err := rows.Scan(&router.ID, &router.Path, &router.Name, &router.PID, &router.CreateDate, &router.UpdateDate)
		if err != nil {
			log.Fatal(err)
		}
		routers = append(routers, router)
	}
	rows.Close()
	return
}

//Update schema
func (router *Router) Update() int64 {
	rs, err := db.SQLDB.Exec("update router set path = ?, name = ?, pid = ?, updateDate = ? where id = ?", router.Path, router.Name, router.PID, router.UpdateDate, router.ID)
	if err != nil {
		log.Fatal(err)
	}
	rows, err := rs.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	return rows
}

//Delete deleteOne
func Delete(id int) int64 {
	rs, err := db.SQLDB.Exec("delete from router where id = ?", id)
	if err != nil {
		log.Fatal()
	}
	rows, err := rs.RowsAffected()
	if err != nil {
		log.Fatal()
	}
	return rows
}

// RouterCount
func RouterCount() int64 {
	var count int64
	err := db.SQLDB.QueryRow("select count(0) count from router").Scan(&count)
	if err != nil {
		log.Fatal()
	}
	return count
}
