'use client'
import {useCallback, useEffect, useRef, useState} from 'react'

import {Canvas} from '@/common/components/Canvas'
import {SortMenu} from '@/common/modules/sort/components/SortMenu'

import {useTheme} from 'next-themes'

import {random} from '@/common/utils'

import {
	FpsChoiceData,
	FpsChoiceKey,
	Scenario
} from '@/common/modules/sort/types'

import {AnimationState, FpsChoices} from '@/common/modules/sort/constants'

type Dimension = {
	width: number
	height: number
}

const defaultDimensions: Dimension = Object.freeze({
	width: 300,
	height: 300
})

type Indices = {
	i: number
	j: number
}

const initialFps = FpsChoices.find((v) => v.key === 'slow')!
const initialArrayLength = 10
const initialStartedStatus = false

const defaultIndices: Indices = Object.freeze({
	i: 0,
	j: -2
})

const initialAnimationState: AnimationState = AnimationState.idle
const defaultScenario: Scenario = 'random'

export function BubbleSortVisualization() {
	const {systemTheme, theme} = useTheme()
	const currentTheme = theme === 'system' ? systemTheme : theme
	const isDark = currentTheme === 'dark'

	const [selectedFps, setSelectedFps] = useState<FpsChoiceData>(initialFps)

	const [arrayLength, setArrayLength] = useState(initialArrayLength)
	const originalArrayRef = useRef<number[]>(Array(arrayLength).fill(0))
	const arrayRef = useRef<number[]>(Array(arrayLength).fill(0))

	const isArrayInitialized = useRef<boolean>(false)
	const indicesRef = useRef<Indices>(Object.assign({}, defaultIndices))

	const [width, setWidth] = useState(defaultDimensions.width)
	const [height, setHeight] = useState(defaultDimensions.height)

	const [isStarted, setIsStarted] = useState<boolean>(initialStartedStatus)
	const [scenario, setScenario] = useState<Scenario>(defaultScenario)
	const [animationState, setAnimationState] = useState<AnimationState>(
		initialAnimationState
	)

	const fillArray = useCallback(
		(length: number) => {
			const array: number[] = []

			for (let i = 0; i < length; i++) {
				const value = Math.floor(random(10, 90))
				array.push(value)
			}

			if (scenario === 'worst-case') {
				array.sort((a, b) => b - a)
			}

			originalArrayRef.current = array
			arrayRef.current = Array.from(array)
		},
		[scenario]
	)

	const start = useCallback(() => {
		if (animationState === AnimationState.completed) {
			arrayRef.current = Array.from(originalArrayRef.current)
		}

		setIsStarted(true)
		setAnimationState(AnimationState.running)
	}, [animationState])

	const stop = useCallback(() => {
		// stop the animation
		setIsStarted(false)
		setAnimationState(AnimationState.stopped)

		// reset the indices & the array to their original values
		indicesRef.current = Object.assign({}, defaultIndices)
		arrayRef.current = Array.from(originalArrayRef.current)
	}, [])

	const resume = useCallback(() => {
		setAnimationState(AnimationState.running)
	}, [])

	const pause = useCallback(() => {
		setAnimationState(AnimationState.paused)
	}, [])

	const reset = useCallback(() => {
		isArrayInitialized.current = false
		indicesRef.current = Object.assign({}, defaultIndices)

		setSelectedFps(initialFps)

		setArrayLength(initialArrayLength)
		fillArray(initialArrayLength)

		setScenario(defaultScenario)
		setIsStarted(initialStartedStatus)
		setAnimationState(initialAnimationState)
	}, [fillArray])

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
			const indices = indicesRef.current

			const divisions = width / arraySize
			const barWidth = divisions - 1
			const length = arraySize
			const compareIndices = [indices.j, indices.j + 1]

			if (isDark) {
				ctx.fillStyle = 'rgba(255,255,255,0.1)'
				ctx.fillRect(0, 0, width, height)
			}

			for (let k = 0; k < length; k++) {
				const value = Math.floor(array[k])

				const barHeight = (value / 100) * height
				const x = k * (divisions + 0.05)
				const y = height - barHeight

				ctx.fillStyle = compareIndices.includes(k)
					? (isDark ? 'rgba(255,100,100,0.8)' : 'rgba(255,0,0,0.4)')
					: (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)' )

				ctx.fillRect(x, y, barWidth, barHeight)

				ctx.fillStyle = isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.8)'
				ctx.fillRect(x, y, barWidth, 10)
			}
		},
		[width, height, isDark, arrayLength]
	)

	const update = useCallback(() => {
		const array = arrayRef.current
		const length = arrayLength
		const indices = indicesRef.current

		const upperLimitI = length - 1
		const upperLimitJ = length - indices.i - 1

		if (indices.i < upperLimitI && indices.j < upperLimitJ) {
			const prev = array[indices.j]
			const next = array[indices.j + 1]

			if (prev > next) {
				;[array[indices.j], array[indices.j + 1]] = [next, prev]
			}

			indices.j++
		}

		if (indices.j >= upperLimitJ) {
			indices.j = 0
			indices.i++
		}

		if (indices.i >= upperLimitI) {
			indices.i = 0
			indices.j = defaultIndices.j

			setIsStarted(false)
			setAnimationState(AnimationState.completed)
		}
	}, [arrayLength])

	const handleFpsChange = useCallback(
		(value: FpsChoiceKey) =>
			setSelectedFps(FpsChoices.find((v) => v.key === value) ?? initialFps),
		[]
	)

	const generateNewArray = useCallback(() => {
		fillArray(arrayLength)
	}, [fillArray, arrayLength])

	const handleArrayLengthChange = useCallback((newLength: number) => {
		isArrayInitialized.current = false
		indicesRef.current = Object.assign({}, defaultIndices)

		setArrayLength(newLength)

		setIsStarted(initialStartedStatus)
		setAnimationState(initialAnimationState)
	}, [])

	const handleScenarioChange = useCallback((value: Scenario) => {
		isArrayInitialized.current = false
		indicesRef.current = Object.assign({}, defaultIndices)

		setScenario(value)
		setIsStarted(initialStartedStatus)
		setAnimationState(initialAnimationState)
	}, [])

	useEffect(() => {
		addEventListener('blur', pause)

		return () => {
			removeEventListener('blur', pause)
		}
	}, [pause, resume])

	return (
		<div className="flex flex-col md:flex-row flex-wrap gap-8">
			<Canvas
				wrapperClassName="flex-grow max-w-full sm:max-w-xl lg:max-w-lg xl:max-w-xl max-h-[420px] transition-all rounded-sm"
				canvasClassName="rounded-sm shadow-lg border-2 border-gray-100 dark:border-zinc-700"
				width={width}
				setWidth={setWidth}
				height={height}
				setHeight={setHeight}
				fps={selectedFps.value}
				animationState={animationState}
				draw={draw}
				update={update}
				initialize={initializeData}
			/>

			<SortMenu
				animationState={animationState}
				isStarted={isStarted}
				fpsValue={selectedFps}
				onFpsValueChange={handleFpsChange}
				arrayLength={arrayLength}
				onArrayLengthChange={handleArrayLengthChange}
				generateNewArray={generateNewArray}
				scenario={scenario}
				onScenarioChange={handleScenarioChange}
				start={start}
				stop={stop}
				resume={resume}
				pause={pause}
				reset={reset}
			/>
		</div>
	)
}
