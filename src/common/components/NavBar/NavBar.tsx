import {NavHeader} from './NavHeader'
import {NavBarContent} from './NavBarContent'

export function NavBar() {
	return (
		<div className="w-[0] opacity-0 transition-all lg:min-w-[250px] lg:opacity-100">
			<div className='hidden lg:block p-4'>
				<NavHeader />
				<NavBarContent />
			</div>
		</div>
	)
}
