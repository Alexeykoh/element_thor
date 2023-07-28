import {clearState, ThorState} from "./components/thorState.js";
import {elementDetermination} from "./components/determination/element-determination.js";
import {componentDetermination} from "./components/determination/component-determination.js";
import {renderComponent} from "./components/thorRenderElement.js";
import {setEvents} from "./components/thorEventExecuter.js";

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
		getAll: () => {
			return stateList
		},
		clearStorageState: () => {
			return clearState()
		}
	}

	function element(args) {
		return elementDetermination({...args})
	}

	function component(args) {
		return componentDetermination({...args}, componentsID)
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
				key: data.UID,
				eventOrder: eventOrder
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
			setEvents({
				renderDOM: renderDOM,
				eventOrder: eventOrder
			})
				.then(() => {
					eventOrder = []
				})
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