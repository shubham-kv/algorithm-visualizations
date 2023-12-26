'use client'

import {useEffect, useRef} from 'react'
import {CanvasPrimitive} from './CanvasPrimitive'
import {CanvasProps} from './types'

export function Canvas(props: CanvasProps) {
	const {setWidth, setHeight, wrapperClassName} = props
	const wrapper = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const resizeCallback = () => {
			if (wrapper.current) {
				const {width, height} = wrapper.current.getBoundingClientRect()
				setWidth(Math.floor(width))
				setHeight(Math.floor(height))
			}
		}

		const observer = new ResizeObserver(resizeCallback)

		if (wrapper.current) {
			observer.observe(wrapper.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [setWidth, setHeight])

	return (
		<div ref={wrapper} className={wrapperClassName}>
			<CanvasPrimitive {...props} />
		</div>
	)
}
