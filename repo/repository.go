package repo

import "time"

type Rempla struct {
	Id           int
	Debut        string `json:"debut"`
	Fin          string `json:"fin"`
	Lieu         string `json:"lieu"`
	Logiciel     string `json:"logiciel"`
	Created_at   time.Time
	Updated_at   time.Time
	Validated    bool `json:"validated"`
	Retrocession int  `json:"retrocession"`
	Temps_trajet int  `json:"temps_trajet"`
}

type DBrepo interface {
	InsertRempla(Rempla) error
	DeleteRempla(int) error
	InitTable() error
	DeleteTable() error
	UpdateRempla(Rempla) error
	GetAllRempla() ([]Rempla, error)
}
