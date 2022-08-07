
import {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState } from 'react'
import {actions} from '../redux/redux.js'
import {useTranslation} from 'react-i18next'
export default function Main(){
    let refinedTodo=[]
      const { t } = useTranslation();
    const [option,showOption]=useState(false)
    const nameInput = useSelector(s=>s.todos.nameInput)
    const todos = useSelector(s=>s.todos.todos)
    const setEdit = useSelector(s=>s.todos.setEdit)
    const newName= useSelector(s=>s.todos.newName)
 const handleNewName=(e,todo)=>{
     console.log(e.key)
        if(e.key === 'Enter'){
       dispatch(actions.handleNewName(todo))       
        }
    }
    const handleChangedName =e=>{
          dispatch(actions.handleChangedName(e.target.value))

    }
    const filteredTodos = useSelector(s=>s.todos.filteredTodos)
    const perPage = useSelector(s=>s.todos.perPage)
    const page = useSelector(s=>s.todos.page)
    const filterOptions = useSelector(s=>s.todos.filterOptions)
    const filterTodosText = useSelector(s=>s.todos.filterTodosText)
    const todoDate = useSelector(s=>s.todos.todoDate)
    const isFilterChoosen = useSelector(s=>s.todos.isFilterChoosen)
    const dispatch = useDispatch()
    
    const addTodos =(e)=>{
        e.preventDefault()
        let resDate=[]
        let dateNow = new Date(todoDate)
        let day = dateNow.getDate()
        let month = dateNow.getMonth() + 1
        let weekDay = dateNow.getDay()
         weekDay === 0 ? weekDay = 7 :''
         resDate = {
            day:day,month:month,
            weekDay:weekDay
         }
        dispatch(actions.addTodos(resDate))
        setTimeout(()=>{
            dispatch(actions.setToNull())
        },2000)
    
    }
    const handleName =e =>{
        dispatch(actions.handleName(e.target.value))
    }
    const doneTodo = todo =>{
        dispatch(actions.doneTodo(todo))
    }
    const favTodo=todo=>{
        dispatch(actions.favTodo(todo))
    }
    const editTodo=todo=>{
        dispatch(actions.editTodo(todo))
    }
    const filterOptionsByName=e=>{
     showOption(false)
    dispatch(actions.filterTodos(e))
    }

     useEffect(()=>{
        dispatch(actions.setFilteredTodos())
    },[todos])  
    const filterByDate =()=>{
        dispatch(actions.filterByDate())
    }
    const handleDateInput =e=>{
       dispatch(actions.handleDateInput(e.target.value))
    }
    const formatTodo=dateNow=>{
          let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
        'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
         let monthId = monthName.map((e,i)=>i+1)
         let result = monthId.reduce((o, k, i) => ({...o, [k]: 
         monthName[i]}), {})
        return `${result[dateNow.month]} ${ dateNow.day}` 
    }

let from = (perPage * page) - perPage
let to = page * perPage
let computedTodos=[]
 computedTodos=[...filteredTodos.slice(from,to)]

const filterOptionsNext= t('filterOptions',{ returnObjects: true })

    
    return(
        <div className='main_section'>
     <form onSubmit={addTodos} className='form_section'>
     <input type="text"  className="form-control inputs"  value={nameInput} onChange={handleName} placeholder={t('AddTodo')}/>
         <input   type='date' className='form-control inputs' value={todoDate} onChange={handleDateInput}/>
     <button disabled={nameInput.length && todoDate.length ? false:true} className='btn btn-success' type='submit'>{t('Submit')}</button>
     </form>

<div className='selected_filter'>
<p  className='filter_name' onClick={()=>showOption(!option)}>{ !isFilterChoosen ?  t('filterTodosText') : filterTodosText}</p>   
    { option && filterOptionsNext.map((e)=>(
    <div key={e.name}>
    <p className='filter_name'  onClick={()=>filterOptionsByName(e)}>{e.name}</p>
    </div>  
    ))}
  
    
  
  

</div>
            

<div>
    {computedTodos.map((todo)=>(
    <div key={todo.id} className='single_todo'>
        {setEdit !== todo.id ? <p className={todo.isDone ? 'done_todo' :''}>{todo.name}</p> : <input 
                         value={newName}                                                         onKeyUp={(e)=>handleNewName(e,todo)}            onChange={handleChangedName}
 placeholder={t('Enternewname' )}
                                                                                className='edit_input'/>}
<span>{formatTodo(todo.dateNow)}</span>
        
      <div className='todo_icons'>
        <button  onClick={()=>editTodo(todo)}  className='btn btn-primary icons_btn'><i className="bi bi-pencil-square"></i></button >
        <button  onClick ={()=>favTodo(todo)} className='btn btn-danger icons_btn'>
            
            {todo.isFavourite ? <i className="bi bi-heart-fill"></i> :  <i className="bi bi-heart"></i>}
           </button>
        <button  onClick ={()=>doneTodo(todo)} 
 className='btn btn-warning icons_btn'>
        
            {todo.isDone ? <i className="bi bi-check2-all"></i>
            
            :<i className="bi bi-check"></i>
            }
        
        </button ></div>
    </div>
    ))}
    {!filteredTodos.length && <div
                                  style={{textAlign:'center',
                                         fontWeight:300}}
      >{t('noTodos')}</div>}
</div>





            
        </div>
    )
}