package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (app *Application) Routes() http.Handler {

	mux := chi.NewRouter()

	mux.Get("/", app.RenderAccueil)
	mux.Get("/form", app.RenderRemplaForm)
	mux.Post("/api/calendar/{month}", app.CalendarHandler)

	mux.Post("/api/rempla/new", app.InsertRemplaHandler)
	mux.Post("/api/rempla/update/{id}", app.UpdateRemplaHandler)
	mux.Post("/api/rempla/delete/{id}", app.DeleteRemplaHandler)

	fileServer := http.FileServer(http.Dir("./static/"))
	mux.Handle("/static/*", http.StripPrefix("/static", fileServer))

	return mux

}
