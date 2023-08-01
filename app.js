import {Thor} from "./thorLibrary/ThorLibrary.js";
import {todoListComponent} from "./list.js";

// entry point
export const thor = new Thor({id: 'app'})

const solidList = [
	{
		id: 0,
		text: 'hello leha'
	},
	{
		id: 1,
		text: 'hello ivan'
	}
]

// states
export const [todoList, setTodoList] = thor.state.set({
	value: solidList,
})

export const [inputValue, setInputValue] = thor.state.set({value: ''})


function changeValue(newValue) {
	setInputValue(newValue)

}

export function addTask() {
	if (inputValue()) {
		let list = [...todoList()]
		list.push(
			{
				id: Date.now(),
				text: inputValue()
			}
		)
		setTodoList(list)
		changeValue('')
	}
}

export function remTask(id) {
	let list = [...todoList()]
	list = list.filter((el) => {
		return el.id !== id
	})
	setTodoList(list)
}

// DOM elements
thor.parent(
	new thor.component({
		name: 'TODO',
		parent: new thor.element({
			tag: 'div',
			classList: ['container']
		}),
		children: [
			new thor.component({
				name: 'h2',
				parent: new thor.element({
					tag: 'h2',
					text: 'TODO',
				}),
				children: []
			}),
			todoListComponent,
			new thor.component({
				name: 'input',
				parent: new thor.element({
					tag: 'input',
					atrList: [{placeholder: 'kek'}],
					value: inputValue,
					eventList: [
						{
							'change': [
								(e) => {
									e.preventDefault()
									changeValue(e.target.value)
								}
							],
						},
					]
				}),
				children: []
			}),
			new thor.component({
				name: 'sendButton',
				parent: new thor.element({
					tag: 'button',
					text: 'add task',
					eventList: [
						{
							'click':
								[
									() => {
										addTask()
									}
								]
						}
					]
				}),
				children: []
			}),
			new thor.component({
				name: 'state button',
				parent: new thor.element({
					tag: 'button',
					text: 'show state',
					eventList: [
						{
							'click':
								[
									() => {
										console.log(thor.state.getAll())
									}
								]
						}
					]
				}),
				children: []
			}),
		]
	})
)




