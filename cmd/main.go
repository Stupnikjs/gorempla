package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Stupnikjs/gorempla/api"
	"github.com/Stupnikjs/gorempla/repo/dbrepo"
	"github.com/joho/godotenv"
)

var BucketName string = "firstappbucknamezikapp"

func main() {
	if err := godotenv.Load("./.env"); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	app := api.Application{
		Port: 3322,
	}
	app.BucketName = BucketName

	conn, err := app.ConnectToDB()

	app.DB = &dbrepo.PostgresRepo{
		DB: conn,
	}
	if err != nil {
		log.Fatalf("Error loading db conn: %v", err)
	}

	err = app.DB.InitTable()

	fmt.Println(err)

	http.ListenAndServe(fmt.Sprintf(":%d", app.Port), app.Routes())

}
