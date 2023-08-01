import {clearState, ThorState} from "./components/thorState.js";
import {elementDetermination} from "./components/determination/element-determination.js";
import {componentDetermination} from "./components/determination/component-determination.js";
import {renderComponent} from "./components/thorRenderElement.js";
import {setEvents} from "./components/thorEventExecuter.js";
import finalReplaceChild from "./components/render/renderDOM.js";

export function Thor({
	id
}) {
	let appInitialPoint = document.getElementById(id); // входная точка
	let parentElements = null; // дерево объекта нового thorDOM
	let componentsID = 1; // ID всех компонетов
	let eventOrder = [] // очередь ивентов
	let stateList = [] // список состояний
	let stateID = 0 // счетчик ID состояний
	//

	//
	const state = {
		// описание команд состояний
		set: (args) => {
			// передает методы для получений и установления состояний.
			// args принимает объект, где:
			//  value <any> - стартовое значение
			//  callback <function> - функция, которая вызовется после изменения состояния
			//  force <bool> - true будет вызывать ререндер при каждом изменение состояния
			//	storage <string> - задает ID для хранения в localStorage. Если ID задан,
			// значит состояние будет хранится локально
			return ThorState({...args}, stateList, renderDOM, stateID)
		},
		getAll: () => {
			// возвращает список всех состояний
			return stateList
		},
		clearStorageState: () => {
			// очищает все состояния
			return clearState()
		}
	}

	function element(args) {
		return elementDetermination({...args})
	}

	function component(args) {
		return componentDetermination({...args}, componentsID++)
	}

	function parent(parent) {
		getParent(parent)
			.then(() => {
				renderDOM()
			})
	}

	function renderDOM(entry = appInitialPoint) {
		//
		let entryElement = entry.cloneNode(true)

		//
		function recursion(data, toAppend) {
			const parentElement = renderComponent({
				tags: data.parent(),
				key: data.UID,
				eventOrder: eventOrder
			})
			toAppend.appendChild(parentElement)
			data?.children()?.forEach((el) => {
				if (typeof el === 'object') {
					recursion(el, parentElement)
				}
				if (typeof el === 'function') {
					recursion(el(), parentElement)
				}
			})
		}

		//
		recursion(parentElements, entryElement)
		//
		const newDOM = entryElement.cloneNode(true) // клон DOM
		const mainParent = document.getElementById(id).parentElement // родитель входной точки в DOM
		const prevDOM = document.getElementById(id) //предыдущее значение входной точки
		//

		finalReplaceChild({
			newDOM: newDOM,
			prevDOM: prevDOM,
			mainParent: mainParent
		})
			.then(() => {
				// после подмены назначаются ивенты из очереди
				setEvents({
					renderDOM: renderDOM, // функция рендера DOM
					eventOrder: eventOrder // очередь назначений ивентов
				})
					.then(
						// после назначения ивентов очищается очередь их назначения
						() => {
							eventOrder = []
						}
					)
			})
	}

	async function getParent(parent) {
		parentElements = parent
		return parent
	}


	return {
		state,
		parent,
		element,
		renderDOM,
		component,
	}
}