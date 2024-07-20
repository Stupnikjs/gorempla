package repo

type Rempla struct {
	Id           int
	Debut        string `json:"debut"`
	Fin          string `json:"fin"`
	Lieu         string `json:"lieu"`
	Logiciel     string `json:"logiciel"`
    Created_at string time.Time
    Updated_at string time.Time
    Validated bool `json::"validated"`
	Retrocession int    `json:"retrocession"`
	Temps_trajet int    `json:"temps_trajet"`
}

type DBrepo interface {
	InsertRempla(Rempla) error
	DeleteRempla(int) error
	InitTable() error
	UpdateRempla(Rempla) error
	GetAllRempla() ([]Rempla, error)
}
