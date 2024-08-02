// Capitalized product name first word
export const CapitalizedFirstLetter = (productName: string): string => {
  if (!productName) return ''
  const [firstWord, ...rest] = productName.split(' ')
  const capitalizedFirstLetter: string =
    firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase()
  return [capitalizedFirstLetter, ...rest].join(' ')
}
