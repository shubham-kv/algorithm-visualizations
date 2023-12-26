import {ThemeSwitcher} from '@/common/modules/theme/components'

export function AppBar() {
	return (
		<div className='lg:hidden relative'>
			<header className='opacity-100 lg:opacity-0 flex justify-between items-center p-4 border-b-2 border-b-gray-200 dark:border-b-zinc-700 shadow-md sticky top-0 left-0'>
				<div>
					<h1 className="text-3xl font-lobster">Visualizations</h1>
				</div>

				<div>
					<ThemeSwitcher />
				</div>
			</header>
		</div>
	)
}
