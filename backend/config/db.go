package config

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectDB() {
	mongoURI := os.Getenv("mongoURI")
	if mongoURI == "" {
		log.Fatal("dotenv Not Loaded Correctly")
	}

	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURI))

	if err != nil {
		log.Fatal(err)
	}

	DB = client
	myDB := DB.Database("blogdb")
	myDB.CreateCollection(context.Background(), "techblogs")
	myDB.CreateCollection(context.Background(), "solutions")
	myDB.CreateCollection(context.Background(), "daily")
	log.Println("Connected to MongoDB!")
}

func GetCollection(collectionName string) *mongo.Collection {
	return DB.Database("blogdb").Collection(collectionName)
}
