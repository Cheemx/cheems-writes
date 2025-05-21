package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func DailyBlogRoutes(router *gin.Engine) {
	tech := router.Group("/api/daily-blogs")
	{
		tech.GET("/", controllers.GetAllDailyBlogs)
		tech.GET("/:slug", controllers.GetDailyBlogBySlug)

		tech.Use(middleware.RequireAuth())
		tech.POST("/", controllers.CreateDailyBlog)
		tech.PUT("/:slug", controllers.UpdateDailyBlog)
		tech.DELETE("/:slug", controllers.DeleteDailyBlog)
	}
}
