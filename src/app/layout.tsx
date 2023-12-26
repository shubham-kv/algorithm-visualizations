import type {Metadata} from 'next'

import {inter, lobster} from './fonts'
import {NavBar} from '@/common/components'

import './globals.css'

export const metadata: Metadata = {
	title: 'Algorithm Visualizations',
	description: 'Algorithms visualizations with HTML5 Canvas'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" className={`${inter.variable} ${lobster.variable}`}>
			<body className="font-sans">
				<div className="flex min-h-screen">
					<NavBar />
					<div className="flex-grow">
						<div className="px-6 h-full">
							{children}
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}
