export function thorInspector({stateList}) {
	const window = document.createElement('ul')
	window.style.position = 'absolute'
	//
	window.style.bottom = '0px'
	window.style.right = '0px'
	window.style.height = '50%'
	window.style.width = '30%'
	window.style.border = 'black 5px solid'
	window.style.padding = ' 1rem'
	//
	window.innerHTML = 'elelelle'

	document.querySelector('body').appendChild(window)
	stateList.forEach((el) => {
		const li = document.createElement('li')
		//
		li.style.width = 'fit-content'
		//
		li.innerHTML = 'lilili'
		window.appendChild(li)
		console.log(el)
	})
}