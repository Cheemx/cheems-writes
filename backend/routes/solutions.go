package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func SolutionRoutes(router *gin.Engine) {
	tech := router.Group("/api/solution")
	{
		tech.GET("/", controllers.GetAllSolutions)
		tech.GET("/:slug", controllers.GetSolutionByProbNum)

		tech.Use(middleware.RequireAuth())
		tech.POST("/create", controllers.CreateSolution)
		tech.DELETE("/:slug", controllers.DeleteSolution)
	}
}
