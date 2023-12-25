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

import {FpsChoiceData, FpsChoiceKey} from '../types'
import {AnimationState, FpsChoices} from '../constants'

type MenuProps = {
	animationState: AnimationState

	fpsValue: FpsChoiceData
	onFpsValueChange: (key: FpsChoiceKey) => void

	arrayLength: number
	onArrayLengthChange: (newLength: number) => void

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
		<div className="h-fit inline-flex flex-col p-4 space-y-4 border-gray-100 border-2 rounded-md">
			<div className="flex space-x-2">
				<Button onClick={resume} disabled={!isStarted || isRunning} variant={'outline'}>
					Resume
				</Button>

				<Button onClick={pause} disabled={!isStarted || isPaused} variant={'outline'}>
					Pause
				</Button>

				<Button
					onClick={reset}
					disabled={isRunning}
					variant={'outline'}
				>
					Reset
				</Button>
			</div>

			<div>
				<Select value={fpsValue.key} onValueChange={onFpsValueChange}>
					<SelectTrigger>
						<SelectValue placeholder="Select speed" />
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
									{choice.name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="flex justify-between items-baseline">
				<Label htmlFor="array-length-input">Array length:</Label>

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
