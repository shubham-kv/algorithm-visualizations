'use client'
import {ChangeEvent, useCallback} from 'react'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'

import {FpsChoiceData, FpsChoiceKey, Scenario} from '../types'
import {AnimationState, FpsChoices, Scenarios} from '../constants'

type MenuProps = {
	animationState: AnimationState

	fpsValue: FpsChoiceData
	onFpsValueChange: (key: FpsChoiceKey) => void

	arrayLength: number
	onArrayLengthChange: (newLength: number) => void
	generateNewArray: () => void

	scenario: Scenario
	onScenarioChange: (value: Scenario) => void

	isStarted: boolean

	start: () => void
	stop: () => void
	resume: () => void
	pause: () => void
	reset: () => void
}

export function SortMenu(props: MenuProps) {
	const {
		animationState,
		fpsValue,
		onFpsValueChange,
		arrayLength,
		onArrayLengthChange,
		generateNewArray,
		scenario,
		onScenarioChange,
		isStarted,
		start,
		stop,
		resume,
		pause,
		reset
	} = props

	const handleArrayLengthChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newLength = parseInt(e.target.value)
			onArrayLengthChange(newLength)
		},
		[onArrayLengthChange]
	)

	const isPaused = animationState === AnimationState.paused
	const isRunning = animationState === AnimationState.running

	return (
		<div className="flex-grow sm:max-w-xl lg:max-w-lg xl:max-w-md inline-flex flex-col p-4 space-y-4 border-gray-100 border-2 rounded-md">
			<div className="flex space-x-2">
				<Button
					onClick={resume}
					disabled={!isStarted || isRunning}
					variant={'outline'}
				>
					<span>Resume</span>
				</Button>

				<Button
					onClick={pause}
					disabled={!isStarted || isPaused}
					variant={'outline'}
				>
					<span>Pause</span>
				</Button>

				<Button onClick={reset} disabled={isRunning} variant={'outline'}>
					Reset
				</Button>
			</div>

			<div>
				<Select value={fpsValue.key} onValueChange={onFpsValueChange}>
					<SelectTrigger>
						<SelectValue placeholder="Select speed" className="capitalize" />
					</SelectTrigger>

					<SelectContent>
						<SelectGroup>
							<SelectLabel>{`Speed`}</SelectLabel>

							{FpsChoices.map((choice) => (
								<SelectItem
									key={choice.key}
									value={choice.key}
									className="capitalize"
								>
									{choice.name.charAt(0).toLocaleUpperCase() +
										choice.name.substring(1)}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="flex justify-between items-baseline">
				<Label htmlFor="array-length-input">Array Size:</Label>

				<Input
					id="array-length-input"
					type="number"
					step={5}
					min={10}
					max={40}
					className="w-20 rounded-none outline-none"
					value={arrayLength}
					onChange={handleArrayLengthChange}
					disabled={isRunning}
				/>
			</div>

			<div className="flex justify-between">
				<Label htmlFor="scenario-input">Scenario:</Label>

				<RadioGroup
					id="scenario-input"
					value={scenario}
					onValueChange={onScenarioChange}
					className="flex flex-col space-y-1"
					disabled={isRunning}
				>
					{Scenarios.map((value, i) => (
						<div key={value} className="flex align-baseline space-x-2">
							<RadioGroupItem id={`scenario-${value}-${i}`} value={value} />

							<Label htmlFor={`scenario-${value}-${i}`} className="capitalize">
								{value.replaceAll('-', ' ')}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>

			<div>
				<Button
					onClick={generateNewArray}
					variant={'outline'}
					className="w-full"
					disabled={isStarted}
				>
					Generate new array
				</Button>
			</div>

			<div>
				<Button
					onClick={start}
					variant={'default'}
					className="w-full"
					disabled={isStarted}
				>
					Start
				</Button>
			</div>

			<div>
				<Button
					onClick={stop}
					variant={'secondary'}
					className="w-full"
					disabled={!isStarted}
				>
					Stop
				</Button>
			</div>
		</div>
	)
}
