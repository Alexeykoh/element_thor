export function ThorState({
	value,
	callback,
	force,
}, stateList, renderDOM) {
	const stateID = stateList.length + 1
	stateList.push({
		id: stateID,
		value: value
	})
	return [
		() => {
			return stateList.filter((el) => el.id === stateID)[0].value
		},
		(newValue) => {
			stateList.forEach((el) => {
				if (el.id === stateID) {
					el.value = newValue
				}
			})
			//
			if (force) {
				renderDOM()
			}
			//
			if (callback) {
				callback()
			}
		}
	]
}