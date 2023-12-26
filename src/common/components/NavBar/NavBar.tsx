import {NavHeader} from './NavHeader'
import {NavBarContent} from './NavBarContent'

export function NavBar() {
	return (
		<div className="min-w-[250px] p-4 mr-6">
			<NavHeader />
			<NavBarContent />
		</div>
	)
}
