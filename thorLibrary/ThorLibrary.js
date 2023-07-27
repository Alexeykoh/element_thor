import {ThorState} from "./components/thorState.js";

export function Thor({id}) {
	let appInitialPoint = document.getElementById(id);
	let parentElements = null;
	let componentsID = 0;
	let eventOrder = []
	let stateList = []


	const state = {
		set: (args) => {
			return ThorState({...args}, stateList, renderDOM)
		},
		getAll: ()=>{
			return stateList
		}
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
			const element = document.getElementById(`elemenThor-${id}`)
			const eventType = event[0]
			const eventFn = function () {
				event[1]()
			}
			//
			element.addEventListener(eventType, eventFn, true)
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
		// tags.eventList.forEach((el) => {
		// 	eventOrder.push({
		// 		id: key,
		// 		event: el
		// 	})
		// })
		//
		return element
	}

	function parent(parent) {
		parentElements = parent
		return parent
	}


	function renderDOM() {
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
		const mainParent = document.getElementById(id).parentElement
		const prevDOM = document.getElementById(id)

		mainParent.replaceChild(
			newDOM,
			prevDOM
		)

		setTimeout(() => {
			setEvents()
		}, 50)
	}

	return {
		state,
		parent,
		element,
		renderDOM,
		component,
	}
}