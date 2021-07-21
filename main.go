package main

import (
	"fmt"
	"time"
)

func main() {
	time.FixedZone("CST", 3600*8)
	now := time.Now().Local()
	fmt.Print(now)
}
