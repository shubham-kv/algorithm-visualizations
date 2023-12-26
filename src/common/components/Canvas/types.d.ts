export type CanvasProps = {
	width: number
	setWidth: Dispatch<SetStateAction<number>>
	height: number
	setHeight: Dispatch<SetStateAction<number>>

	wrapperClassName?: string | undefined
	canvasClassName?: string | undefined

	fps?: number
	animationState?: AnimationState

	initialize: () => void
	draw: (ctx: CanvasRenderingContext2D) => void
	update: () => void
	cleanUp?: () => void
}
