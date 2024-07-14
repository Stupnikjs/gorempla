package api

import (
	"fmt"
	"time"
)

var Months = []string{"Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"}
var daysOfWeek = []string{"D", "L", "M", "M", "J", "V", "S"}

type CalendarElementType string

type CalendarElement struct {
	Type  CalendarElementType
	Value any
}

func GetCalendar() []CalendarElement {

	today := time.Now().Add(time.Hour * 24)
	year, month, day := today.Date()

	dayOfWeek := int(today.Weekday())
	fmt.Println(year, int(month), day, int(dayOfWeek))

	return nil
}
