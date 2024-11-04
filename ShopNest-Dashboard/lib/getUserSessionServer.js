
const getUser = async () => {
    const response = await fetch('/api/user-data')
    return response.json()
  }
  
  export default getUser