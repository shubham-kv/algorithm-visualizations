import {FpsChoiceData, Scenario} from './types'

export const FpsChoices: FpsChoiceData[] = [
	{
		key: 'very-slow',
		name: 'very slow',
		value: 2
	},
	{
		key: 'slow',
		name: 'slow',
		value: 4
	},
	{
		key: 'medium',
		name: 'medium',
		value: 8
	},
	{
		key: 'fast',
		name: 'fast',
		value: 16
	},
	{
		key: 'very-fast',
		name: 'very fast',
		value: 30
	},
]

export const Scenarios: Scenario[] = [
	'random',
	// 'beast-case',
	'worst-case'
]

export enum AnimationState {
	idle,
	running,
	paused,
	stopped
}
