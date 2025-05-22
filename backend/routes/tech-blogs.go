package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func TechBlogRoutes(router *gin.Engine) {
	tech := router.Group("/api/tech-blogs")
	{
		tech.GET("/", controllers.GetAllTechBlogs)
		tech.GET("/:slug", controllers.GetTechBlogBySlug)

		tech.Use(middleware.RequireAuth())
		tech.POST("/create", controllers.CreateTechBlog)
		tech.PUT("/:slug", controllers.UpdateTechBlog)
		tech.DELETE("/:slug", controllers.DeleteTechBlog)
	}
}
