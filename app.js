import {Thor} from "./ThorLibrary.js";

const thor = new Thor({id: 'app'})
const [kek, setKek] = thor.state({value: 'kek-class'})
const [lol, setLol] = thor.state({value: 'lol'})
const [counter, setCounter] = thor.state({value: 1})

thor.parent(
	new thor.component({
		name: 'nav',
		parent: new thor.element({
			tag: 'nav',
			classList: ['nav', 'nav--main']
		}),
		children: [
			new thor.component({
				name: 'ul',
				parent: new thor.element({
					tag: 'ul',
					text: 'ul'
				}),
				children: [
					new thor.component({
						name: 'li',
						parent: new thor.element({
							tag: 'li',
							text: 'li',
							classList: [
								(() => {
									return kek()
								})()
							]
						}),
						children: [
							new thor.component({
								name: 'p1',
								parent: new thor.element({
									tag: 'p',
									text: 'paragraph'
								})
							}),
							new thor.component({
								name: 'p2',
								parent: new thor.element({
									tag: 'p',
									text: 'paragraph'
								})
							}),
						]
					}),
					new thor.component({
						name: 'grandButton',
						parent: new thor.element({
							tag: 'button',
							text: `click on me ${counter()}`,
							eventList: [
								{
									click: () => {
										setCounter(counter() + 1)
										console.log(counter())
									}
								}
							]
						})
					})
				]
			})
		]
	})
)

thor.renderDOM()