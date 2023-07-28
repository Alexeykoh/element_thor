export function elementDetermination(params) {
	const componentParams = {
		tag: params.tag || 'div',
		text: params.text || '',
		classList: params.classList || [],
		atrList: params.atrList || [],
		eventList: params.eventList || [],
		checked: params.checked || false,
		value: params.value || '',
	}
	return componentParams;
}