
export function Link({children, ...rest})
{
	return <a {...rest} target="_blank">{children}</a>
}
