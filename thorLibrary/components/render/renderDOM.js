export default async function finalReplaceChild({
	newDOM,
	prevDOM,
	mainParent
}) {
	// ассинхронноая подмена старого DOM на обновленный
	mainParent.replaceChild(
		newDOM,
		prevDOM
	)
}