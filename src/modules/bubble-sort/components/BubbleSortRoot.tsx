import {Header} from './Header'
import {BubbleSortVisualization} from './BubbleSortVisualization'
import {bubbleSortSampleCode} from '../data'

export function BubbleSortRoot() {
	return (
		<main>
			<section>
				<Header text={'Bubble Sort'} />

				<div className="w-full mt-4">
					<BubbleSortVisualization />
				</div>

			</section>

			<section className='mt-12'>
				<Header text={'Algorithm'} />

				<div className="inline-block">
					<pre className="text-white bg-gray-900 bg-opacity-80 p-4 rounded-md">
						{bubbleSortSampleCode}
					</pre>
				</div>

				<div className="mt-24"></div>
			</section>
		</main>
	)
}
