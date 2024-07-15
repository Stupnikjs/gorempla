package dbrepo

import (
	"context"
	"database/sql"

	"github.com/Stupnikjs/gorempla/repo"
)

type PostgresRepo struct {
	DB *sql.DB
}

var InsertRemplaQuery string = `
`

func (m *PostgresRepo) InsertRempla(rempla repo.Rempla) error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	_, err := m.DB.ExecContext(ctx,
		`
		INSERT INTO Remplas (Debut, Fin, Lieu, Logiciel, Retrocession, Temps_trajet)
		VALUES ($1, $2, $3, $4, $5, $6);
		`, rempla.Debut,
		rempla.Fin,
		rempla.Lieu,
		rempla.Logiciel,
		rempla.Retrocession,
		rempla.Temps_trajet)
	return err
}

func (m *PostgresRepo) DeleteRempla(id int) error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	_, err := m.DB.ExecContext(ctx,
		`
	DELETE FROM Remplas WHERE Id = $1
	`, id)
	return err
}

func (m *PostgresRepo) UpdateRempla(rempla repo.Rempla) error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	_, err := m.DB.ExecContext(ctx, `
	UPDATE Remplas
	SET
    Debut = $2,
    Fin = $3,
    Lieu = $4,
    Logiciel = $5,
    Retrocession = $6,
    Temps_trajet = $7
	WHERE id = $1;
	`,
		rempla.Id,
		rempla.Debut,
		rempla.Fin,
		rempla.Lieu,
		rempla.Logiciel,
		rempla.Retrocession,
		rempla.Temps_trajet,
	)
	return err
}

func (m *PostgresRepo) InitTable() error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	_, err := m.DB.ExecContext(ctx, `
	CREATE TABLE IF NOT EXISTS Remplas (
	Id SERIAL PRIMARY KEY,
    Debut TEXT,
    Fin TEXT,
    Lieu TEXT,
    Logiciel TEXT,
    Retrocession TEXT,
    Temps_trajet TEXT
);`)
	return err
}
