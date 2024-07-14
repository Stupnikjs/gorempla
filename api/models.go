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

type JsonReq struct {
	Action string      `json:"action"`
	Rempla repo.Rempla `json:"object"`
}

func ParseJsonReq(r *http.Request) (*JsonReq, error) {

	reqJson := JsonReq{}
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
