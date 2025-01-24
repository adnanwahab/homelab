package main

import (
	"fmt"
	"time"

	"github.com/go-vgo/robotgo"
	"github.com/vcaesar/imgo"
)

func main() {
	sx, sy := robotgo.GetScreenSize()

	for {
		timestamp := time.Now().Format("2006-01-02_15-04-05")
		fmt.Printf("Capturing screen at: %s\n", timestamp)

		bit := robotgo.CaptureScreen(0, 0, sx, sy)
		img := robotgo.ToImage(bit)
		imgo.Save(fmt.Sprintf("/Users/shelbernstein/Desktop/screenshot.png"), img)

		robotgo.FreeBitmap(bit)
		time.Sleep(time.Second)
	}
}

// https://github.com/go-vgo/robotgo
