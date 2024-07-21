package api

import (
	"encoding/json"
	"html/template"
	"net/http"
	"path"
	"strconv"
	"time"

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

	td.Data = make(map[string]any)

	dateObj := make(map[string]int)
	year, month, _ := time.Now().Date()
	dateObj["year"] = year
	dateObj["month"] = int(month)
	td.Data["Date"] = dateObj

	_ = render(w, r, "/calendar.gohtml", &td)
}

func (app *Application) RenderRemplaForm(w http.ResponseWriter, r *http.Request) {

	td := TemplateData{}

	td.Data = make(map[string]any)

	dateObj := make(map[string]int)
	year, month, _ := time.Now().Date()
	dateObj["year"] = year
	dateObj["month"] = int(month)
	td.Data["Date"] = dateObj

	_ = render(w, r, "/rempla_form.gohtml", &td)
}
func (app *Application) InsertRemplaHandler(w http.ResponseWriter, r *http.Request) {
	RemplaReq, err := app.ParseRemplaRequest(r)
	if err != nil {
		app.ErrorResponse(w, 404, err)
		return
	}

	err = app.DB.InsertRempla(RemplaReq.Rempla)

	w.Write([]byte("insert in db succeded"))
}

type jsonCalendar struct {
	Month string `json:"month"`
	Year  string `json:"year"`
}

func (app *Application) ErrorResponse(w http.ResponseWriter, status int, err error) {
	errResp := ErrorResp{
		Error: err.Error(),
	}
	bytes, _ := json.Marshal(errResp)
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
func (app *Application) GetAllRemplaHandler(w http.ResponseWriter, r *http.Request) {

	Remplas, err := app.DB.GetAllRempla()

	if err != nil {
		app.WriteErrorJson(w, err, 404)
		return
	}

	bytes, err := json.Marshal(Remplas)
	w.WriteHeader(200)
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)

}
