import type {Metadata} from 'next'

import {inter, lobster} from './fonts'
import {NavBar, AppBar} from '@/common/components'

import {ThemeProvider} from '@/common/modules/theme/providers'

import './globals.css'

export const metadata: Metadata = {
	title: 'Algorithm Visualizations',
	description: 'Algorithms visualizations with HTML5 Canvas'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" className={`${inter.variable} ${lobster.variable}`}>
			<body className="font-sans">
				<ThemeProvider>
					<div className="flex min-h-screen">
						<NavBar />
						<div className="flex-grow">
							<AppBar />
							<div className="px-6 h-full">{children}</div>
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
