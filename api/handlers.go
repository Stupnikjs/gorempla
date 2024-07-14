package api

import (
	"html/template"
	"net/http"
	"path"
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

	calendar := GetCalendar()

	td.Data["Calendar"] = calendar

	_ = render(w, r, "/acceuil.gohtml", &td)
}
func (app *Application) InsertRemplaHandler(w http.ResponseWriter, r *http.Request) {

}
