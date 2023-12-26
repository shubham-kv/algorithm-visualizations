import {Header} from './Header'
import {BubbleSortVisualization} from './BubbleSortVisualization'

export function BubbleSortRoot() {
	return (
		<>
			<section className='py-4 mb-8'>
				<Header text={'Bubble Sort '} />

				<div>
					<p>
						An Inspirational Visualization of the Bubble Sort
						Algorithm by using Html Canvas.
					</p>
				</div>

				<div className="mt-6">
					<BubbleSortVisualization />
				</div>
			</section>
		</>
	)
}
