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

	const animateHandle = useRef<number>(0)
	const then = useRef<number>(0)
	const now = useRef<number>(0)

	const animate = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			if (!isMounted.current) {
				return
			}

			now.current = Date.now()
			const elapsed = now.current - then.current

			if (elapsed > fpsInterval) {
				then.current = now.current - (elapsed % fpsInterval)

				ctx.clearRect(0, 0, width, height)
				draw(ctx)

				if (animationState === AnimationState.running) {
					update()
				}
			}

			animateHandle.current = requestAnimationFrame(() => {
				animate(ctx)
			})
		},
		[width, height, animationState, fpsInterval, draw, update]
	)

	const startAnimation = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			then.current = Date.now()
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
			cancelAnimationFrame(animateHandle.current)
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
