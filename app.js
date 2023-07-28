import {Thor} from "./thorLibrary/ThorLibrary.js";

// entry point
const thor = new Thor({id: 'app'})

const solidList = {
	value: [
		{
			id: 0,
			text: 'hello leha'
		},
		{
			id: 1,
			text: 'hello ivan'
		},
	]
}

// states
const [todoList, setTodoList] = thor.state.set(solidList)
const [inputValue, setInputValue] = thor.state.set('')


// DOM elements
thor.parent(
	new thor.component({
		name: 'title',
		parent: new thor.element({
			tag: 'h1',
			text: 'elemenThor TODO'
		}),
		children: [
			new thor.component({
				name: 'ul',
				parent: new thor.element({
					tag: 'ul',
				}),
				children: todoItemList()
			}),
			new thor.component({
				name: 'input',
				parent: new thor.element({
					tag: 'input',
					atrList: [{placeholder: 'kek'}],
					value: 'ertgsdgr',
					eventList: [
						{'change': [()=>{
								console.log('on change')}]}
					]
				}),
				children: []
			}),
			new thor.component({
				name: 'sendButton',
				parent: new thor.element({
					tag: 'button',
					text: 'add task'
				}),
				children: []
			}),
		]
	})
)

// render
thor.renderDOM()

//
function todoItemList() {
	return todoList().map((el) => {
		return (
			new thor.component({
				name: 'li',
				parent: new thor.element({
					tag: 'li',
					text: el.text,
				}),
				children: []
			})
		)
	})
}

