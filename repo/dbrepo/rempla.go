package dbrepo

import (
	"database/sql"

	"github.com/Stupnikjs/gorempla/repo"
)

type PostgresRepo struct {
	DB *sql.DB
}

var InsertRemplaQuery string = `
`

func (m *PostgresRepo) InsertRempla(rempla repo.Rempla) {

}
