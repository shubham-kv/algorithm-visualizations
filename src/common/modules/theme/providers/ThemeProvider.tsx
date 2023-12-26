"use client"

import {ThemeProvider as Provider} from 'next-themes'
import {PropsWithChildren, useEffect, useState} from 'react'

export function ThemeProvider(props: PropsWithChildren) {
	const {children} = props
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <>{children}</>
	}

	return (
		<Provider enableSystem={true} attribute="class">
			{children}
		</Provider>
	)
}
