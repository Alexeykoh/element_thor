const LocalStorageName = 'thorLocalState'

export function ThorState({
		value,
		callback,
		force,
		storage,
	},
	stateList,
	renderDOM,
	stateIDCounter
) {
	stateIDCounter + 1

	let stateID = storage
		? storage
		: Date.now() + stateList.length + stateIDCounter

	const startState = {
		id: stateID,
		value: value,
		callback: callback || null,
		isForce: force || false,
		localStorageID: storage || null,
		events: []
	}

	// установка стартового состояния
	if (storage) {
		// установка в локальное хранилище
		const localIsEmpty = localStorage.getItem(LocalStorageName) === null
		if (localIsEmpty) {
			localStorage.setItem(LocalStorageName, JSON.stringify([]))
		}
		//
		const getStorage = getLocalState()
		//
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
	//

	return [
		() => {
			// возврат состояния
			if (storage) {
				// возврат из хранилища
				return getLocalState().filter((el) => el.id === stateID)[0].value
			} else {
				// возврат временного состояния
				return stateList.filter((el) => {
					if (el.id === stateID) {
						return el
					}
				})[0].value
			}
		},
		//
		(newValue) => {
			// установка нового состояния
			if (storage) {
				// обновление чостояния в хранилище
				updateLocalState({
					id: stateID,
					value: newValue
				})
			} else {
				// обновление временного состояния
				stateList.forEach((el) => {
					if (el.id === stateID) {
						el.value = newValue
					}
				})
			}
			// принудительное обновление дерева
			if (force) {
				renderDOM()
			}
			// вызов вложенной функции
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