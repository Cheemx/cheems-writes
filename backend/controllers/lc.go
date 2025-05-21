package controllers

import (
	"backend/config"
	"backend/models"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAllSolutions(c *gin.Context) {
	collection := config.GetCollection("solutions")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Solutions"})
		return
	}

	var blogs []models.LCSolution
	if err := cursor.All(ctx, &blogs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cursor error"})
		return
	}

	c.JSON(http.StatusOK, blogs)
}

func GetSolutionByProbNum(c *gin.Context) {
	problemNo := c.Param("problemNo")
	collection := config.GetCollection("solutions")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var blog models.LCSolution
	err := collection.FindOne(ctx, bson.M{"problemNo": problemNo}).Decode(&blog)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	c.JSON(http.StatusOK, blog)
}

func DeleteSolution(c *gin.Context) {
	problemNo := c.Param("problemNo")
	collection := config.GetCollection("solutions")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := collection.DeleteOne(ctx, bson.M{"problemNo": problemNo})
	if err != nil || result.DeletedCount == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Deletion failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog deleted"})
}

func CreateSolution(c *gin.Context) {
	var blog models.LCSolution
	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	blog.CreatedAt = time.Now()
	collection := config.GetCollection("solutions")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert blog"})
		return
	}

	c.JSON(http.StatusCreated, blog)
}
