export function renderComponent({
	tags,
	key,
	eventOrder
}) {
	const element = document.createElement(tags.tag)
	element.setAttribute('id', "elemenThor-" + key)
	//

	if (typeof tags.text === "string") {
		element.innerText = tags.text
	}
	if (typeof tags.text === 'function') {
		element.innerText = tags.text()
	}
	//
	tags.classList.forEach((el) => {
		if (typeof el === "string" && el !== '') {
			element.classList.add(el.replace(/ /g, ''))
		}
		if (typeof el === "function" && el() !== '') {
			let fnResult = el().toString().replace(/ /g, '')
			element.classList.add(fnResult)
		}
	})
	//
	tags.eventList.forEach((el) => {
		eventOrder.push({
			id: key,
			event: el,
			eventOrder: eventOrder
		})
	})
	//
	tags.atrList.forEach((el) => {
		element.setAttribute(
			Object.keys(el).toString(), Object.values(el).toString()
		)
	})
	//
	setValue({element:element,tags:tags})
	//
	return element
}

function setValue ({element,tags}){
	if (typeof tags.value === "string" && tags.value !== '') {
		element.value = tags.value
	}
	if (typeof tags.value === "function" && tags.value !== '') {
		element.value = tags.value()
	}
}