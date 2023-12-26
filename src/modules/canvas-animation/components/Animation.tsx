'use client'
import {useCallback, useRef} from 'react'

import {Canvas} from '@/common/components/Canvas'
import {Ball} from '../entities/Ball'

const width = 700
const height = 600

export function Animation() {
	const ballsRef = useRef<Ball[]>([])

	const initializeData = useCallback(() => {
		const balls: Ball[] = []
		for (let i = 0; i < 10; i++) {
			const ball = Ball.create({width, height})
			balls.push(ball)
		}

		ballsRef.current = balls
	}, [])

	const draw = useCallback((ctx: CanvasRenderingContext2D) => {
		const balls = ballsRef.current

		for (const ball of balls) {
			ball.draw(ctx)
			ball.update({
				width,
				height
			})
		}
	}, [])

	const update = useCallback(() => {
		const balls = ballsRef.current

		for (const ball of balls) {
			ball.update({
				width,
				height
			})
		}
	}, [])

	return (
		<div className="w-full h-full">
			<div>{/* <Button variant={'outline'}>Start</Button> */}</div>

			<div className="w-full relative mt-4">
				<Canvas
					className="inline-block rounded-sm border-2 border-slate-300"
					width={width}
					height={height}
					fps={360}
					draw={draw}
					update={update}
					initialize={initializeData}
				/>
			</div>
		</div>
	)
}
