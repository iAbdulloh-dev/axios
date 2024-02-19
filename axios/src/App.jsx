import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [url, setUrl] = useState('http://localhost:3000/data')
  const [api, setApi] = useState([])
  const [situation, setSituation] = useState('')
  const [condition, setCondition] = useState(null)
  useEffect(() => {
    axios.get(url)
      .then(response => {
        setApi(response.data)
      })
  }, [situation])
  console.log(api);
  function deleteIteam(parametr) {
  axios.delete(`${url}/${parametr}`)
  .then(() =>{
    setApi(info =>(info.filter((value) => value.id != parametr)))
  })
  }
  return (
    <div>
      <table border={2} cellPadding={10}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Year</th>
            <th>Action</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {
            api.map((value , index) => {
              return (
                <tr key={value.id}>
                  <td>{index+1}</td>
                  <td>{value.name}</td>
                  <td>{value.year}</td>
                  <td><button onClick={deleteIteam()}>delete</button></td>
                  <td>
                    {
                      value.id == condition ? (
                        <button onClick={save}>save</button>
                      ) :
                        (
                          <button onClick={() => editIteam(value.id)}>edit</button>
                        )
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App