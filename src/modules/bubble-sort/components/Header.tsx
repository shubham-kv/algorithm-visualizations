export function Header({text}: {text: string}) {
	const id = text.toLowerCase().replace(/\s+/g, '-')

	return (
		<header>
			<h2 className="text-xl my-4" id={id}>
				<span>{text}</span>
			</h2>
		</header>
	)
}
