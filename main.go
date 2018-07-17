package main

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
)

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()
	ws := melody.New()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./assets", true)))
	router.Use(static.Serve("/", static.LocalFile("./dist", true)))
	router.GET("/ws", func(c *gin.Context) {
		ws.HandleRequest(c.Writer, c.Request)
	})

	ws.HandleMessage(func(s *melody.Session, msg []byte) {
		ws.Broadcast(msg)
	})
	// Start and run the server
	router.Run(":3000")
}
