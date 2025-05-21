package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LCSolution struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	ProblemNo int                `json:"problemNo"`
	Name      string             `json:"name"`
	Link      string             `json:"link"`
	CreatedAt time.Time          `json:"createdAt"`
}
