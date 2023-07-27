import {Thor} from "./ThorLibrary.js";

// entry point
const thor = new Thor({id: 'app'})


// states
const [kek, setKek] = thor.state({value: 'kek-class'})
const [lol, setLol] = thor.state({value: 'lol'})

const [counter, setCounter] = thor.state({value: 1})

const [color, setColor] = thor.state({value: false})

function changeColor() {
	setColor(!color())
}

function encreseCounter() {
	setCounter(counter() + 1)
}

// DOM elements
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
							text: () => {
								return 'lel ' + counter()
							},
							classList: [
								'lel',
								'w25',
								() => {
									if (color()) {
										return 'red'
									} else {
										return ''
									}
								}
							],
							eventList: [
								[
									'click', () => {
									changeColor();
									}
								],
							]
						})
					}),
				]
			})
		]
	})
)

// render
thor.renderDOM()
