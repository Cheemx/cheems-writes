package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DailyBlog struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string             `json:"title"`
	Description string             `json:"description"`
	Slug        string             `json:"slug"`
	Content     string             `json:"content"`
	CreatedAt   time.Time          `json:"createdAt"`
}
