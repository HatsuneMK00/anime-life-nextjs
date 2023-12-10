// Accept date like 2023-05-13T00:42:35.078+08:00 and convert to 2023.05.13
const formatDate = (date) => {
  const formatDate = date.substring(0, date.indexOf('T'))
  if (formatDate === '0001-01-01') {
    return ''
  }
  return formatDate.replace(/-/g, '.')
}

export default formatDate