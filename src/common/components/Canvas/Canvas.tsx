'use client'

import {useEffect, useRef} from 'react'
import {CanvasPrimitive} from './CanvasPrimitive'
import {CanvasProps} from './types'

export function Canvas(props: CanvasProps) {
	const {setWidth, setHeight, wrapperClassName} = props
	const wrapper = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		let timerId: NodeJS.Timer

		const handleResize = () => {
			if (timerId) {
				clearTimeout(timerId as any)
			}

			timerId = setTimeout(() => {
				if (wrapper.current) {
					const element = wrapper.current
					const width = element.clientWidth
					const height = element.clientHeight

					setWidth(width)
					setHeight(height)
				}
			}, 100)
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [setWidth, setHeight])

	return (
		<div
			ref={wrapper}
			className={wrapperClassName}
		>
			<CanvasPrimitive {...props} />
		</div>
	)
}
