package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (app *Application) Routes() http.Handler {

	mux := chi.NewRouter()

	mux.Get("/", app.RenderAccueil)
	mux.Get("/api/calendar", app.CalendarHandler)
	mux.Post("/api/new", app.InsertRemplaHandler)

	fileServer := http.FileServer(http.Dir("./static/"))
	mux.Handle("/static/*", http.StripPrefix("/static", fileServer))

	return mux

}
