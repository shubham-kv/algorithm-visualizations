import {NavHeader} from './NavHeader'
import {NavBarContent} from './NavBarContent'
import {ThemeSwitcher} from '@/common/modules/theme/components'

export function NavBar() {
	return (
		<div className="w-[0] opacity-0 transition-all lg:min-w-[250px] lg:opacity-100">
			<div className='hidden lg:block p-4'>
				<NavHeader />
				<NavBarContent />

				<div className='mt-4'>
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	)
}
