package repo

type Rempla struct {
	Debut        string
	Fin          string
	Lieu         string
	Logiciel     string
	Retrocession string
	Temps_trajet string
	Couleur      string
}

type DBrepo interface {
	InsertRempla(Rempla) error
	DeleteRempla(int) error
	InitTable()
}
