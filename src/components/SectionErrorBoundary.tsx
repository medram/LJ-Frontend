import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import SectionFallback from "./errors/SectionFallback";


export default function SectionErrorBoundary({ children }: { children: ReactNode })
{
	return (
		<ErrorBoundary FallbackComponent={SectionFallback}>
			{children}
		</ErrorBoundary>
	)
}
