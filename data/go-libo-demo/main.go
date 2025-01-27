package main

import (
	"fmt"
	"time"

	"github.com/go-vgo/robotgo"
	"github.com/vcaesar/imgo"
)

var like_x, like_y = 1700, 485
var then_like_x, then_like_y = 1605, 492

func main() {
	sx, sy := robotgo.GetScreenSize()

	for {
		timestamp := time.Now().Format("2006-01-02_15-04-05")
		fmt.Printf("Capturing screen at: %s\n", timestamp)

		bit := robotgo.CaptureScreen(0, 0, sx, sy)
		img := robotgo.ToImage(bit)
		imgo.Save(fmt.Sprintf("/Users/shelbernstein/Pictures/flirt-flow/%s.png", timestamp), img)

		robotgo.FreeBitmap(bit)

		robotgo.Move(like_x, like_y)
		robotgo.Click()
		time.Sleep(time.Second)
		robotgo.Move(then_like_x, then_like_y)
		robotgo.Click()
		time.Sleep(time.Second)
		x, y := robotgo.Location()

		fmt.Printf("Mouse position: %v, %v\n", x, y)
	}
}

// https://github.com/go-vgo/robotgo
