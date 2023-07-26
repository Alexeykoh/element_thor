export function Thor({id}) {
	const appInitialPoint = document.getElementById(id);
	let parentElements = null;
	let componentsID = 0;

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

				console.group('state')
				console.log('start rerender')
				console.log('stateValue', stateValue)
				console.log('newValue', newValue)
				console.groupEnd()
				stateValue = newValue
				//
				renderDOM()

				if (callback) {
					callback()
				}
				return stateValue
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

	function renderComponent({
		tags,
		key
	}) {
		const element = document.createElement(tags.tag)
		element.setAttribute('key', "elemenThor-" + key)
		//
		element.innerText = tags.text
		//
		tags.eventList.forEach((el) => {
			element.addEventListener('click', () => {
					Object.values(el)[0]()
				}
			)
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
			const parentElement = renderComponent({tags: data.parent()})
			toAppend.appendChild(parentElement)
			data?.children()?.forEach((el) => {
				recursion(el, parentElement)
			})
		}

		//
		recursion(parentElements, entryElement)
		appInitialPoint.innerHTML = ''
		//
		entryElement.childNodes.forEach((el) => {
			appInitialPoint.appendChild(el)
		})
	}


	return {
		state,
		parent,
		element,
		renderDOM,
		component

	}
}