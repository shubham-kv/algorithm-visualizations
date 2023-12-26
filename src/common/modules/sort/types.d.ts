export type Choice<K = string, V = number> = {
	key: K
	name: string
	value: V
}

export type FpsChoiceKey =
	| 'very-slow'
	| 'slow'
	| 'medium'
	| 'fast'
	| 'very-fast'
export type FpsChoiceData = Choice<FpsChoiceKey, number>

export type Scenario = 'random' | 'beast-case' | 'worst-case'
