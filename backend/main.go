package main

import (
	"backend/config"
	"backend/controllers"
	"backend/routes"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	config.ConnectDB()

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Backend is working!"})
	})

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://cheems-writes.vercel.app/"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.RedirectTrailingSlash = false

	router.POST("/api/admin/login", controllers.AdminLogin)
	routes.TechBlogRoutes(router)
	routes.SolutionRoutes(router)
	routes.DailyBlogRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "10000" // default fallback (optional)
	}

	log.Printf("Starting server on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
