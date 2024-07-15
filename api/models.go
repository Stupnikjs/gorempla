package api

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/Stupnikjs/gorempla/repo"
)

type Application struct {
	DB         repo.DBrepo
	Port       int
	BucketName string
}

type RemplaReq struct {
	Action string      `json:"action"`
	Rempla repo.Rempla `json:"object"`
}

type ErrorResp struct {
	Error string `json:"error"`
}

func (app *Application) WriteErrorJson(w http.ResponseWriter, err error, status int) {
	errJson := ErrorResp{
		Error: err.Error(),
	}

	bytes, _ := json.Marshal(errJson)
	w.WriteHeader(status)
	w.Write(bytes)
}

func (app *Application) ParseRemplaRequest(r *http.Request) (*RemplaReq, error) {

	reqJson := RemplaReq{}
	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		return nil, err
	}

	r.Body.Close()

	err = json.Unmarshal(bytes, &reqJson)

	if err != nil {
		return nil, err
	}
	return &reqJson, nil

}
