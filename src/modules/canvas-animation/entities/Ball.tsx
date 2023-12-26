import {random} from '@/common/utils'

export class Ball {
	x: number = 0
	y: number = 0
	radius: number = 10
	velocityX: number = 1.0
	velocityY: number = 1.0

	constructor(point: Partial<Ball>) {
		Object.assign(this, point)
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = 'rgba(0,0,0,0.2)'
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		ctx.closePath()
		ctx.fill()
	}

	update(params: {width: number; height: number}) {
		const {width, height} = params
		const radius = this.radius

		if (this.x - radius <= 0 || this.x + radius >= width) {
			this.velocityX = -this.velocityX
		}

		if (this.y - radius <= 0 || this.y + radius >= height) {
			this.velocityY = -this.velocityY
		}

		this.x += this.velocityX
		this.y += this.velocityY
	}

	static create(params: {width: number; height: number}) {
		const {width, height} = params
		const diameter = random(40, 60)
		const radius = diameter / 2

		const x = random(diameter + 10, width - diameter - 10)
		const y = random(diameter + 10, height - diameter - 10)
		let velocityX = random(0.5, 1)
		let velocityY = random(0.5, 1)

		if (Math.random() > 0.5) {
			velocityX = -velocityX
		}

		if (Math.random() > 0.5) {
			velocityY = -velocityY
		}

		return new Ball({x, y, radius, velocityX, velocityY})
	}
}
