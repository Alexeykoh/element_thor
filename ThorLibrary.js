export function Thor({id}) {
	let appInitialPoint = document.getElementById(id);
	let parentElements = null;
	let componentsID = 0;
	let eventOrder = []

	function state({
		value,
		callback
	}) {
		let stateValue = value || null
		return [
			() => {
				return stateValue
			},
			(newValue) => {
				stateValue = newValue
				//
				renderDOM()

				if (callback) {
					callback()
				}
				// return stateValue
			}
		]
	}

	function element(params) {
		const componentParams = {
			tag: params.tag || 'div',
			text: params.text || '',
			classList: params.classList || [],
			atrList: params.atrList || {},
			eventList: params.eventList || [],
		}
		return componentParams;
	}

	function component({
		name,
		state,
		parent,
		children
	}) {
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

	function setEvents() {
		eventOrder.forEach(({
			id,
			event
		}) => {
			document.getElementById(`elemenThor-${id}`).addEventListener(event[0], function () {
				event[1]()
			})
		})
		eventOrder = []
	}


	function renderComponent({
		tags,
		key
	}) {
		const element = document.createElement(tags.tag)
		element.setAttribute('id', "elemenThor-" + key)
		//
		element.innerText = tags.text
		//
		tags.classList.forEach((el) => {
			if (typeof el === "string") {
				element.classList.add(el)
			}
			if (typeof el === "function") {
				let fnResult = el().toString()
				console.log('renderComponent', fnResult)
				element.classList.add(fnResult)
			}
		})
		//
		tags.eventList.forEach((el) => {
			eventOrder.push({
				id: key,
				event: el
			})
		})
		//
		return element
	}

	function parent(parent) {
		parentElements = parent
		return parent
	}


	function renderDOM() {
		console.log('render')
		//
		let entryElement = appInitialPoint.cloneNode(true)

		//
		function recursion(data, toAppend) {
			const parentElement = renderComponent({
				tags: data.parent(),
				key: data.UID
			})
			toAppend.appendChild(parentElement)
			data?.children()?.forEach((el) => {
				recursion(el, parentElement)
			})
		}

		//
		recursion(parentElements, entryElement)
		const newDOM = entryElement.cloneNode(true)
		console.log(newDOM)

		console.log('appInitialPoint', appInitialPoint)
		console.log('newDOM', newDOM)
		console.log('appInitialPoint.parentElement', appInitialPoint.parentElement)


		appInitialPoint.parentElement.replaceChild(
			newDOM,
			appInitialPoint
		)

		console.log('eventOrder', eventOrder)
		setTimeout(() => {
			setEvents()
		}, 100)

	}

	return {
		state,
		parent,
		element,
		renderDOM,
		component,
	}
}