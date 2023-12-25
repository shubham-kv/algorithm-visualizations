import Link from 'next/link'

export function Header({text}: {text: string}) {
	const id = text.toLowerCase().replace(/\s+/g, '-')

	return (
		<header>
			<h2 className="text-xl my-4" id={id}>
				#{' '}
				<Link
					href={{
						hash: id
					}}
				>
					<span>{text}</span>
				</Link>
			</h2>
		</header>
	)
}
