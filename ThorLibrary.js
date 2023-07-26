export function Thor({id}) {
	const appInitialPoint = document.getElementById(id);
	let parentElements = null;

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
				if (stateValue !== newValue) {
					rerenderDOM()
					stateValue = newValue
				}
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
		return {
			render: () => {
				return componentParams
			}
		}
	}

	function component({
		state,
		parent,
		children
	}) {
		return {
			state: state,
			parent: () => {
				return parent
			},
			children: () => {
				return children
			}
		}
	}

	function renderComponent(component) {
		console.log('start render')
	}

	function parent(parent) {
		parentElements = parent
		return parent
	}

	function rerenderDOM() {
		console.log(parentElements)
		console.log('rerender')
	}


	return {
		state,
		parent,
		element,
		rerenderDOM,
		component

	}
}