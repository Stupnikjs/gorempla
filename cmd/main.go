package main

import "github.com/Stupnikjs/gorempla/api"

var BucketName string = "firstappbucknamezikapp"

func main() {
	/*
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

		app.DB.InitTable()

		http.ListenAndServe(fmt.Sprintf(":%d", app.Port), app.Routes())

	*/
	api.GetCalendar()

}
