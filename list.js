import {remTask, thor, todoList} from "./app.js";

export function todoListComponent() {
	return new thor.component({
		name: 'ul',
		parent: new thor.element({
			tag: 'ul',
		}),
		children: todoList()?.map((el) => {
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