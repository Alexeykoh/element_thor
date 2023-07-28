export async function setEvents({
	renderDOM,
	eventOrder
}) {
	function clearEventOrder() {
		eventOrder = []
	}

	eventOrder.forEach(({
		id,
		event
	}) => {
		const element = document.getElementById(`elemenThor-${id}`)
		const eventType = Object.keys(event).toString()
		const eventFn = Object.values(event)[0]
		//
		element.addEventListener(eventType, () => {
			executeEventFunctions(eventFn, renderDOM)
		}, true)
	})
	clearEventOrder()
}

async function executeEventFunctions(functionArray, renderDOM) {
	functionArray.forEach((el) => {
		el()
	})
	renderDOM()
}