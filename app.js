import {Thor} from "./thorLibrary/ThorLibrary.js";

// entry point
const thor = new Thor({id: 'app'})

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
const [todoList, setTodoList] = thor.state.set({
	value: solidList,
	storage: 'todoList'
})

const [inputValue, setInputValue] = thor.state.set({value: ''})


function changeValue(newValue) {
	setInputValue(newValue)
}

function addTask() {
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

function remTask(id) {
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
									changeValue(e.target.value)
								}
							]
						}
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
		]
	})
)

// render
thor.renderDOM()


function todoListComponent() {
	return new thor.component({
		name: 'ul',
		parent: new thor.element({
			tag: 'ul',
		}),
		children: todoList().map((el) => {
			return new thor.component({
				name: 'li',
				parent: new thor.element({
					tag: 'li',
				}),
				children: [
					new thor.component({
						name: 'p',
						parent: new thor.element({
							tag: 'p',
							text: el.text,
						}),
						children: []
					}),
					new thor.component({
						name: 'button',
						parent: new thor.element({
							tag: 'button',
							text: 'delete',
							eventList: [
								{
									click: [
										() => {
											remTask(el.id)
										}
									]
								}
							]
						}),
						children: []
					})
				]
			})
		})
	})
}