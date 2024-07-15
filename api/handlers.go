package api

import (
	"encoding/json"
	"html/template"
	"net/http"
	"path"
	"strconv"

	"github.com/go-chi/chi/v5"
)

var pathToTemplates = "./static/templates/"

type TemplateData struct {
	Data map[string]any
}

func render(w http.ResponseWriter, r *http.Request, t string, td *TemplateData) error {
	_ = r.Method

	parsedTemplate, err := template.ParseFiles(path.Join(pathToTemplates, t), path.Join(pathToTemplates, "/base.layout.gohtml"))
	if err != nil {
		return err
	}
	err = parsedTemplate.Execute(w, td)
	if err != nil {
		return err
	}
	return nil

}

// template rendering

func (app *Application) RenderAccueil(w http.ResponseWriter, r *http.Request) {

	td := TemplateData{}

	_ = render(w, r, "/calendar.gohtml", &td)
}

func (app *Application) RenderRemplaForm(w http.ResponseWriter, r *http.Request) {

	td := TemplateData{}

	_ = render(w, r, "/rempla_form.gohtml", &td)
}
func (app *Application) InsertRemplaHandler(w http.ResponseWriter, r *http.Request) {

}

func (app *Application) CalendarHandler(w http.ResponseWriter, r *http.Request) {

	calendar, err := app.GetCalendar()
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	bytes, err := json.Marshal(calendar)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	w.Write(bytes)
}

func (app *Application) DeleteRemplaHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		app.WriteErrorJson(w, err, 404)
		return
	}

	err = app.DB.DeleteRempla(idInt)
	if err != nil {
		app.WriteErrorJson(w, err, 404)
		return
	}
	w.WriteHeader(200)

}
func (app *Application) UpdateRemplaHandler(w http.ResponseWriter, r *http.Request) {
	_ = chi.URLParam(r, "id")
	RemplaReq, err := app.ParseRemplaRequest(r)
	err = app.DB.UpdateRempla(RemplaReq.Rempla)

	if err != nil {
		app.WriteErrorJson(w, err, 404)
		return
	}
	w.WriteHeader(200)

}
