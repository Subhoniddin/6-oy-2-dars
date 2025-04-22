import { useState } from "react"

import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  function getDate() {
      const date = new Date()
    let hours = String(date.getHours()).padStart(2, 0),
      minut = String(date.getMinutes()).padStart(2, 0),
      day = String(date.getDate()).padStart(2, 0),
      month = String(date.getMonth()+1).padStart(2, 0),
      year = String(date.getFullYear()).padStart(2, 0);
      return {hours, minut, day, month, year}
  }
  

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])

  function handleSubmit(e) {
    e.preventDefault()
    if(e.target.title.value.trim() === '') {
      alert('bosh malumot mumkin emas!')
      return;
    }
    const {hours, minut, day, month, year} = getDate()
    const obj = {title: e.target.title.value, hours, minut, day, month, year, id: Date.now()}
    setTodos([...todos, obj])

    todos.push(obj)
    localStorage.setItem('todos', JSON.stringify(todos))

    e.target.reset()
  }

  function remoteitem(id) {
    let result = todos.filter(item => item.id !== id)
      localStorage.setItem('todos', JSON.stringify(result))
      setTodos(result)
  }

  function editItem(id) {
     const {hours, minut, day, month, year} = getDate()
      let result = todos.map(item => item.id === id ? {title: prompt('yangi title kiriting!'),hours, minut, day, month, year, id: Date.now()} : item)
      localStorage.setItem('todos', JSON.stringify(result))
      setTodos(result)
  }

  return (
    <div className="h-full flex justify-center pt-10">
        <div>
          <h1 className="text-white text-7xl font-bold font-mono text-center mb-20">TODO list</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" id="title" name="title" className="border sm:w-auto xl:w-3xl p-3 bg-zinc-300 outline-0 rounded-lg text-2xl"/>
            <button className="p-3 border-0 text-2xl rounded-lg ml-4 cursor-pointer font-bold bg-green-500 text-zinc-100">Qo'shish</button>
          </form>

          <div className="text-slate-900">
            <ul className="sm:w-auto xl:w-3xl mt-8">
              {todos.map(({title, hours, minut,day, month, year, id}, index) => {
                  return<li className="flex justify-between items-center bg-zinc-300 mt-4 h-14 px-2 rounded-lg">
                      
                      <h1 className="font-semibold text-2xl">{`${index +1}. ${title}`}</h1>
                      <div className="h-full flex items-center gap-16">
                        <div className="flex gap-x-3 h-full items-end opacity-50">
                          <span>{`${hours}:${minut}`}</span>
                          <span>{`${day}.${month}.${year}`}</span>
                        </div>
                         <div className="flex items-center gap-x-4 ">
                         <FaPen onClick={() => editItem(id)} className=" cursor-pointer"/>
                          <MdDelete onClick={() => remoteitem(id)} className=" cursor-pointer rounded-full text-3xl"/>
                         </div>
                      </div>
                  </li>
              })}
            </ul>
          </div>

        </div>
    </div>
  )
}

export default App