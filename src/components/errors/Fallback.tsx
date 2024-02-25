import { FallbackProps, useErrorBoundary } from "react-error-boundary"


export default function Fallback({ error }: FallbackProps)
{
	const { resetBoundary } = useErrorBoundary()

	return <div className="fallback">
		Something went wrong!<br/>
		Error: {error.message}<br/>
		refresh?
	</div>
}
