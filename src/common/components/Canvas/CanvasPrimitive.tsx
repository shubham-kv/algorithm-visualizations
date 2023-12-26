'use client'

import {
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'

import {CanvasProps} from './types'

import {AnimationState} from '@/common/modules/sort/constants'
import {DEFAULT_FPS, DEFAULT_HEIGHT, DEFAULT_WIDTH} from './constants'

let then: number, now: number
let animateHandle: number

export function CanvasPrimitive(props: CanvasProps) {
	const {
		canvasClassName,
		initialize,
		draw,
		update,
		cleanUp,
		animationState,
		width = DEFAULT_WIDTH,
		height = DEFAULT_HEIGHT,
		fps = DEFAULT_FPS
	} = props

	const fpsInterval = 1000 / fps
	const isMounted = useRef<boolean>(false)
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

	const animate = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			if (!isMounted.current) {
				return
			}

			now = Date.now()
			const elapsed = now - then

			if (elapsed > fpsInterval) {
				then = now - (elapsed % fpsInterval)

				ctx.clearRect(0, 0, width, height)
				draw(ctx)

				if (animationState === AnimationState.running) {
					update()
				}
			}

			animateHandle = requestAnimationFrame(() => {
				animate(ctx)
			})
		},
		[width, height, animationState, fpsInterval, draw, update]
	)

	const startAnimation = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			then = Date.now()
			animate(ctx)
		},
		[animate]
	)

	useEffect(() => {
		if (!canvas) {
			return
		}

		const ctx = canvas.getContext('2d')!
		isMounted.current = true

		initialize()
		startAnimation(ctx)

		return () => {
			isMounted.current = false

			cleanUp && cleanUp()
			cancelAnimationFrame(animateHandle)
		}
	}, [canvas, initialize, startAnimation, cleanUp])

	return (
		<canvas
			style={{
				width: '100%',
				height: '100%'
			}}
			width={width}
			height={height}
			ref={setCanvas}
			className={canvasClassName}
		/>
	)
}
