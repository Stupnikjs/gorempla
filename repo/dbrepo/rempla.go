package dbrepo

import (
	"context"
	"database/sql"
	"fmt"
	"time"

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
	now := time.Now()
	_, err := m.DB.ExecContext(ctx,
		`
		INSERT INTO remplas (debut, fin, lieu, created_at, updated_at, logiciel, retrocession, temps_trajet, validated)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
		`, rempla.Debut,
		rempla.Fin,
		rempla.Lieu,
		now,
		now,
		rempla.Logiciel,
		rempla,
		rempla.Temps_trajet,
		rempla.Validated,
	)
	return err
}

func (m *PostgresRepo) DeleteRempla(id int) error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	_, err := m.DB.ExecContext(ctx,
		`
	DELETE FROM remplas WHERE id = $1
	`, id)
	return err
}

func (m *PostgresRepo) UpdateRempla(rempla repo.Rempla) error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	_, err := m.DB.ExecContext(ctx, `
	UPDATE remplas
	SET
		debut = $2,
		fin = $3,
		lieu = $4,
		update_at = $5,
		logiciel = $6,
		retrocession = $7,
		temps_trajet = $8,
		validated = $9
	WHERE id = $1;
	`,
		rempla.Id,
		rempla.Debut,
		rempla.Fin,
		rempla.Lieu,
		time.Now(),
		rempla.Logiciel,
		rempla.Retrocession,
		rempla.Temps_trajet,
		rempla.Validated,
	)
	return err
}

func (m *PostgresRepo) InitTable() error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	_, err := m.DB.ExecContext(ctx, `
	CREATE TABLE IF NOT EXISTS remplas (
	id SERIAL PRIMARY KEY,
    debut TEXT,
    fin TEXT,
    lieu TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    logiciel TEXT,
    retrocession INTEGER,
    temps_trajet INTEGER, 
    validated BOOLEAN, 
);`)
	return err
}

func (m *PostgresRepo) GetAllRempla() ([]repo.Rempla, error) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	rows, err := m.DB.QueryContext(ctx,
		` 
	SELECT debut, fin, lieu, created_at, updated_at, logiciel, retrocession, temps_trajet, validated
	FROM remplas; 
	`)
	if err != nil {
		// handle the error
		return nil, err
	}
	defer rows.Close()
	var remplas []repo.Rempla
	for rows.Next() {
		var rempla repo.Rempla
		err := rows.Scan(
			&rempla.Debut,
			&rempla.Fin,
			&rempla.Lieu,
			&rempla.Created_at,
			&rempla.Updated_at,
			&rempla.Logiciel,
			&rempla.Retrocession,
			&rempla.Temps_trajet,
			&rempla.Validated,
		)
		if err != nil {
			// handle the error
			return nil, err
		}
		fmt.Println(rempla)
		// process rempla
		remplas = append(remplas, rempla)
	}

	return remplas, nil
}
