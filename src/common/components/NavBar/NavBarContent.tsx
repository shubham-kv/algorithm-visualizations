'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

type NavData = {
	name: string
	url: string
}

const navData: NavData[] = [
	{
		name: 'Home',
		url: '/'
	},
	{
		name: 'Balls Animation',
		url: '/balls-animation'
	},
	{
		name: 'Bubble Sort',
		url: '/bubble-sort'
	}
]

export function NavBarContent() {
	const pathName = usePathname()

	return (
		<nav className="mt-4">
			<div className="flex flex-col space-y-2">
				{navData.map((navItem) => {
					const isActive = navItem.url === pathName
					const activeClassName = '!text-white !bg-gray-900 dark:!text-black dark:!bg-gray-100'

					return (
						<div
							key={navItem.url}
							className={`transition-colors cursor-pointer rounded-md  hover:bg-gray-200 hover:text-black dark:hover:text-white dark:hover:bg-zinc-800 ${
								isActive ? activeClassName : ''
							} `}
						>
							<Link
								href={navItem.url}
								className="inline-flex w-full h-full p-2 rounded-md transition-colors"
							>
								<span>{navItem.name}</span>
							</Link>
						</div>
					)
				})}
			</div>
		</nav>
	)
}
