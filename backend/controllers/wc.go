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

func GetAllDailyBlogs(c *gin.Context) {
	collection := config.GetCollection("daily")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Blogs"})
		return
	}

	var blogs []models.DailyBlog
	if err := cursor.All(ctx, &blogs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cursor error"})
		return
	}

	c.JSON(http.StatusOK, blogs)
}

func GetDailyBlogBySlug(c *gin.Context) {
	slug := c.Param("slug")
	collection := config.GetCollection("daily")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var blog models.DailyBlog
	err := collection.FindOne(ctx, bson.M{"slug": slug}).Decode(&blog)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	c.JSON(http.StatusOK, blog)
}

func UpdateDailyBlog(c *gin.Context) {
	slug := c.Param("slug")
	var updatedData models.DailyBlog

	if err := c.ShouldBindJSON(&updatedData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	collection := config.GetCollection("daily")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	update := bson.M{
		"$set": bson.M{
			"title":       updatedData.Title,
			"description": updatedData.Description,
			"slug":        updatedData.Slug,
			"content":     updatedData.Content,
		},
	}

	result, err := collection.UpdateOne(ctx, bson.M{"slug": slug}, update)
	if err != nil || result.MatchedCount == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Update failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog updated"})
}

func DeleteDailyBlog(c *gin.Context) {
	slug := c.Param("slug")
	collection := config.GetCollection("daily")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := collection.DeleteOne(ctx, bson.M{"slug": slug})
	if err != nil || result.DeletedCount == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Deletion failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog deleted"})
}

func CreateDailyBlog(c *gin.Context) {
	var blog models.DailyBlog
	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	blog.CreatedAt = time.Now()
	collection := config.GetCollection("daily")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert blog"})
		return
	}

	c.JSON(http.StatusCreated, blog)
}
