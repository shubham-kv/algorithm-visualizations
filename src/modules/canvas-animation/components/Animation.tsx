'use client'
import {useCallback, useRef, useState} from 'react'

import {Canvas} from '@/common/components/Canvas'
import {Ball} from '../entities/Ball'
import {useTheme} from 'next-themes'

const defaultWidth = 400
const defaultHeight = 600

export function Animation() {
	const {systemTheme, theme} = useTheme()
	const currentTheme = theme === 'system' ? systemTheme : theme

	const ballsRef = useRef<Ball[]>([])
	const [width, setWidth] = useState<number>(defaultWidth)
	const [height, setHeight] = useState<number>(defaultHeight)

	const initializeData = useCallback(() => {
		const balls: Ball[] = []
		for (let i = 0; i < 10; i++) {
			const ball = Ball.create({width, height})
			balls.push(ball)
		}

		ballsRef.current = balls
	}, [width, height])

	const draw = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			const balls = ballsRef.current

			for (const ball of balls) {
				ball.draw(ctx, currentTheme as any)
				ball.update({
					width,
					height
				})
			}
		},
		[width, height, currentTheme]
	)

	const update = useCallback(() => {
		const balls = ballsRef.current

		for (const ball of balls) {
			ball.update({
				width,
				height
			})
		}
	}, [width, height])

	return (
		<Canvas
			wrapperClassName="w-[100%] h-[600px]"
			canvasClassName="rounded-sm border-2 border-slate-300 dark:border-zinc-800"
			width={width}
			height={height}
			setWidth={setWidth}
			setHeight={setHeight}
			fps={360}
			draw={draw}
			update={update}
			initialize={initializeData}
		/>
	)
}
