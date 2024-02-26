import { ReactNode, Suspense } from "react";
import SectionLoading from "./SectionLoading";


export default function SectionSuspense({ children }: { children: ReactNode })
{
	return (
		<Suspense fallback={<SectionLoading center={true} />}>
			{children}
		</Suspense>
	)
}
