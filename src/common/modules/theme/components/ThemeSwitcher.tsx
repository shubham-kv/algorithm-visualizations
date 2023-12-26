'use client'

import {Moon, Sun} from 'lucide-react'
import {useTheme} from 'next-themes'
import {useEffect, useState} from 'react'

export function ThemeSwitcher() {
	const {systemTheme, theme, setTheme} = useTheme()
	const [mounted, setMounted] = useState<boolean>(false)

	const currentTheme = theme === 'system' ? systemTheme : theme

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	if (currentTheme === 'dark') {
		return <Sun role="button" onClick={() => setTheme('light')} />
	} else if (currentTheme === 'light') {
		return <Moon role="button" onClick={() => setTheme('dark')} />
	}

	return null
}
