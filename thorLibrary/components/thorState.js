const LocalStorageName = 'thorLocalState'

export function ThorState({
	value,
	callback,
	force,
	storage,
}, stateList, renderDOM) {
	setLocalState()
	const stateID = stateList.length + 1
	const startState = {
		id: stateID,
		value: value
	}
	if (storage) {
		const localIsEmpty = localStorage.getItem(LocalStorageName) === null
		if (localIsEmpty) {
			localStorage.setItem(LocalStorageName, JSON.stringify([]))
		}
		//
		const getStorage = getLocalState()
		if (getStorage.length === 0) {
			setLocalState(startState)
		} else {
			const isSet = getStorage.filter((el) => {
				return el.id === startState.id
			})
			if (!isSet) {
				setLocalState(startState)
			}

		}
	} else {
		stateList.push(startState)
	}

	return [
		() => {
			if (storage) {
				return getLocalState().filter((el) => el.id === stateID)[0].value
			} else {
				return stateList.filter((el) => el.id === stateID)[0].value
			}
		},
		//
		(newValue) => {
			if (storage) {
				let toUpdate = {
					id: stateID,
					value: newValue
				}
				updateLocalState(toUpdate)
			} else {
				stateList.forEach((el) => {
					if (el.id === stateID) {
						el.value = newValue
					}
				})
			}
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

function updateLocalState(updateValue) {
	let updateState = getLocalState().map((prevValue) => {
		if (prevValue.id === updateValue.id) {
			return updateValue
		} else {
			return prevValue
		}
	})
	localStorage.setItem(LocalStorageName, JSON.stringify(updateState))
}

function setLocalState(value) {
	if (!value) {
		return
	}
	//
	let storage = getLocalState()
	localStorage.setItem(LocalStorageName, JSON.stringify([...storage, value]))
}

function getLocalState() {
	return JSON.parse(localStorage.getItem(LocalStorageName))
}

export function clearState() {
	localStorage.setItem(LocalStorageName, JSON.stringify([]))
}