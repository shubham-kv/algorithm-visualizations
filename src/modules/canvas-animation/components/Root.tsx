import {Header} from './Header'
import {Animation} from './Animation'

export function CanvasAnimation() {
	return (
		<>
			<Header />

			<div>
				<p>
					Simple canvas animation with balls bouncing off the walls.
				</p>
			</div>

			<div className="mt-4">
				<Animation />
			</div>
		</>
	)
}
