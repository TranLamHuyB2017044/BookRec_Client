export default function Loading({ setHeight }) {
	return (
		<div className={setHeight ? 'flex items-center justify-start mt-24 ml-72 h-fit' : "flex items-center justify-center h-screen"}>
			<div className="flex space-x-2">
				<div className="h-10 w-10 bg-red-500 rounded-full animate-bounce"></div>
				<div className="h-10 w-10 bg-green-500 rounded-full animate-bounce"></div>
				<div className="h-10 w-10 bg-blue-500 rounded-full animate-bounce"></div>
			</div>
		</div>
	)
}