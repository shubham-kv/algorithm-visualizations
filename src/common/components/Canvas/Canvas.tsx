'use client'

import {
	CanvasHTMLAttributes,
	DetailedHTMLProps,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import {DEFAULT_FPS, DEFAULT_HEIGHT, DEFAULT_WIDTH} from './constants'
import {AnimationState} from '@/common/modules/sort/constants'

type CanvasProps = DetailedHTMLProps<
	CanvasHTMLAttributes<HTMLCanvasElement>,
	HTMLCanvasElement
> & {
	width?: number
	height: number
	fps?: number
	isAnimationStarted?: boolean
	isPaused?: boolean
	animationState?: AnimationState
	initialize: () => void
	draw: (ctx: CanvasRenderingContext2D) => void
	update: () => void
	cleanUp?: () => void
}

let then: number, now: number
let animateHandle: number

export function Canvas(props: CanvasProps) {
	const {
		initialize,
		draw,
		update,
		cleanUp,
		isPaused,
		isAnimationStarted = false,
		animationState,
		width = DEFAULT_WIDTH,
		height = DEFAULT_HEIGHT,
		fps = DEFAULT_FPS,
		...restProps
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
		canvas.width = width
		canvas.height = height

		initialize()
		startAnimation(ctx)

		return () => {
			isMounted.current = false

			cleanUp && cleanUp()
			cancelAnimationFrame(animateHandle)
		}
	}, [canvas, width, height, initialize, startAnimation, cleanUp])

	return (
		<canvas
			style={{
				width,
				height
			}}
			{...restProps}
			ref={setCanvas}
		/>
	)
}
