import {Thor} from "./ThorLibrary.js";

const thor = new Thor({id: 'app'})
const [kek, setKek] = thor.state({value: 'kek'})
const [lol, setLol] = thor.state({value: 'lol'})

thor.parent({
	parent: thor.component({
		state: kek(),
		parent: new thor.element({tag: 'button'})
	}),
	text: 'header',
	children: []
})

thor.rerenderDOM()