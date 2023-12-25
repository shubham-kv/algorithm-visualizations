'use client'
import {useCallback, useEffect, useRef, useState} from 'react'

import {Canvas} from '@/common/components/Canvas'
import {SortMenu} from '@/common/modules/sort/components/SortMenu'

import {range} from '@/common/utils'

import {FpsChoiceData, FpsChoiceKey} from '@/common/modules/sort/types'
import {AnimationState, FpsChoices} from '@/common/modules/sort/constants'

const width = 700
const height = 600

type Indices = {
	i: number
	j: number
}

const DEFAULT_FPS = FpsChoices.find((v) => v.key === 'medium')!
const DEFAULT_ARRAY_LENGTH = 15
const DEFAULT_STARTED = false

export function BubbleSortVisualization() {
	const [selectedFps, setSelectedFps] = useState<FpsChoiceData>(DEFAULT_FPS)

	const [arrayLength, setArrayLength] = useState(DEFAULT_ARRAY_LENGTH)
	const arrayRef = useRef<number[]>(Array(arrayLength).fill(0))
	const isArrayInitialized = useRef<boolean>(false)

	const indicesRef = useRef<Indices>({i: 0, j: -2})

	const [isStarted, setIsStarted] = useState(DEFAULT_STARTED)
	const [animationState, setAnimationState] = useState<AnimationState>(
		AnimationState.idle
	)

	const fillArray = useCallback((length: number) => {
		const newArray: number[] = []

		for (let i = 0; i < length; i++) {
			const value = Math.floor(range(10, 90))
			newArray.push(value)
		}

		arrayRef.current = newArray
	}, [])

	const initializeData = useCallback(() => {
		if (!isArrayInitialized.current) {
			fillArray(arrayLength)
			isArrayInitialized.current = true
		}
	}, [arrayLength, fillArray])

	const draw = useCallback(
		(ctx: CanvasRenderingContext2D) => {
			const array = arrayRef.current
			const arraySize = arrayLength
			const {j} = indicesRef.current

			const divisions = width / arraySize
			const barWidth = divisions - 1
			const length = arraySize
			const compareIndices = [j, j + 1]

			for (let k = 0; k < length; k++) {
				const value = Math.floor(array[k])

				const barHeight = (value / 100) * height
				const x = k * (divisions + 0.05)
				const y = height - barHeight

				ctx.fillStyle = compareIndices.includes(k)
					? 'rgba(255,0,0,0.4)'
					: 'rgba(0,0,0,0.2)'

				ctx.fillRect(x, y, barWidth, barHeight)

				ctx.font = '32px'
				ctx.fillStyle = 'rgba(0,0,0,0.9)'
				ctx.textAlign = 'center'
				ctx.textBaseline = 'middle'
				ctx.fillText(value.toString(), x + barWidth / 2, height - 20)

				ctx.fillStyle = 'rgba(0,0,0,0.8)'
				ctx.fillRect(x, y, barWidth, 10)
			}
		},
		[arrayLength]
	)

	const update = useCallback(() => {
		const array = arrayRef.current
		const length = arrayLength
		const {i, j} = indicesRef.current

		if (i < length && j < length - i - 1) {
			const prev = array[j]
			const next = array[j + 1]

			if (prev > next) {
				;[array[j], array[j + 1]] = [next, prev]
			}

			indicesRef.current.j++
		}

		if (j === length - i - 1) {
			indicesRef.current.j = 0
			indicesRef.current.i++
		}

		if (indicesRef.current.i === length) {
			indicesRef.current.j = -2
			setIsStarted(DEFAULT_STARTED)
			setAnimationState(AnimationState.idle)
		}
	}, [arrayLength])

	const start = useCallback(() => {
		setIsStarted(true)
		setAnimationState(AnimationState.running)
	}, [])

	const stop = useCallback(() => {
		setIsStarted(false)
		setAnimationState(AnimationState.stopped)
	}, [])

	const resume = useCallback(() => {
		setAnimationState(AnimationState.running)
	}, [])

	const pause = useCallback(() => {
		setAnimationState(AnimationState.paused)
	}, [])

	const reset = useCallback(() => {
		indicesRef.current.i = 0
		indicesRef.current.j = -2

		setSelectedFps(DEFAULT_FPS)

		isArrayInitialized.current = false
		setArrayLength(DEFAULT_ARRAY_LENGTH)
		fillArray(DEFAULT_ARRAY_LENGTH)

		setAnimationState(AnimationState.idle)
		setIsStarted(DEFAULT_STARTED)
	}, [fillArray])

	const onFpsChange = useCallback(
		(value: FpsChoiceKey) =>
			setSelectedFps(FpsChoices.find((v) => v.key === value) ?? DEFAULT_FPS),
		[]
	)

	const onArrayLengthChange = useCallback((newLength: number) => {
		indicesRef.current.i = 0
		indicesRef.current.j = -2

		isArrayInitialized.current = false

		setArrayLength(newLength)
		setIsStarted(DEFAULT_STARTED)
		setAnimationState(AnimationState.idle)
	}, [])

	useEffect(() => {
		addEventListener('blur', pause)

		return () => {
			removeEventListener('blur', pause)
		}
	}, [pause, resume])

	return (
		<div className="w-full h-full flex space-x-8">
			<Canvas
				className="inline-block w-[600px] h-[600px] rounded-sm shadow-lg border-gray-100 border-2"
				width={width}
				height={height}
				fps={selectedFps.value}
				animationState={animationState}
				draw={draw}
				update={update}
				initialize={initializeData}
			/>

			<SortMenu
				animationState={animationState}
				fpsValue={selectedFps}
				isStarted={isStarted}
				arrayLength={arrayLength}
				start={start}
				stop={stop}
				resume={resume}
				pause={pause}
				reset={reset}
				onFpsValueChange={onFpsChange}
				onArrayLengthChange={onArrayLengthChange}
			/>
		</div>
	)
}
