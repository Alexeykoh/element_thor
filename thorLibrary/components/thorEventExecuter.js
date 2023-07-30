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
		element.addEventListener(eventType, (context) => {
			executeEventFunctions({
				functionArray: eventFn,
				renderDOM: renderDOM,
				context: context
			})
		}, true)
	})
	clearEventOrder()
}

function executeEventFunctions({
	functionArray,
	renderDOM,
	context
}) {
	functionArray.forEach((el) => {
		el(context)
	})
	renderDOM()
}