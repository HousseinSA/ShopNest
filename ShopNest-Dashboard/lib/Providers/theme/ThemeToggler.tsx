"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggler() {
  const { setTheme , theme} = useTheme()
console.log(theme)

const lightIcon =  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
const  darkIcon =   <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

const themeIcon = theme ==='dark' ?  darkIcon : lightIcon
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full" size="icon">
         {themeIcon}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="hover:bg-primary-foreground text-primary" onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-primary-foreground text-primary" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
