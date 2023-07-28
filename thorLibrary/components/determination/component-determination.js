export function componentDetermination({
	name,
	parent,
	children
}, componentsID) {
	return {
		UID: componentsID++,
		name: name,
		parent: () => {
			return parent
		},
		children: () => {
			return children
		}
	}
}