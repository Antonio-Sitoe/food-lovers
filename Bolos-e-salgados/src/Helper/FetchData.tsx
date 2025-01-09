
const FetchData = async ({ url, options }) => {
  const response = await fetch(url, options)
  const json = await response.json();
  return json
}

export default FetchData