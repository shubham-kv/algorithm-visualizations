'use client'

import {useEffect, useRef} from 'react'
import {CanvasPrimitive} from './CanvasPrimitive'
import {CanvasProps} from './types'

export function Canvas(props: CanvasProps) {
	const {setWidth, setHeight, wrapperClassName} = props
	const wrapper = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleResize = () => {
			if (wrapper.current) {
				const element = wrapper.current
				const width = element.clientWidth
				const height = element.clientHeight

				setWidth(width)
				setHeight(height)
			}
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
