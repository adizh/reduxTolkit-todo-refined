
import { useState,useEffect } from "react"
import {useSelector,useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {actions} from '../redux/redux.js'
export default function  PaginateTodos(){
useEffect(()=>{
   dispatch(actions.onMountPaginationButtons()) 
},[])

    const {t} = useTranslation()
    const dispatch =useDispatch()
    const todos =useSelector(s=>s.todos.todos)
    const fromButton =useSelector(s=>s.todos.fromButton)
    const perPage =useSelector(s=>s.todos.perPage)
    const areTodosAll =useSelector(s=>s.todos.areTodosAll)
    const mainPage =useSelector(s=>s.todos.mainPage)
    const toButton =useSelector(s=>s.todos.toButton)
    const numOfButtons =useSelector(s=>s.todos.numOfButtons)
    const perPageChange =useSelector(s=>s.todos.errors.perPageChange)
    const paginatedLength =useSelector(s=>s.todos.paginatedLength)
    const [isPerChangse,setPerChanged]=useState(false)
    const [perPageInput,setPerPageInput]=useState(0)
    //let num=Math.ceil(todos.length / perPage)
    let buttons=[]
    for(let i=0;i<numOfButtons;i++){
        buttons.push(i+1)
    }
    const handlePage =page=>{
    dispatch(actions.handlePage(page))
    }
    const nextPage =()=>{
          dispatch(actions.nextPage())  
         } 
    const prevPage =()=>{
        dispatch(actions.prevPage(filteredButtons))
         } 
    const showAll=()=>{
        dispatch(actions.showAll())
    }

    
    let filteredButtons = buttons.slice(fromButton,toButton)
console.log('buttons',buttons)
    console.log('numOgButtons',numOfButtons)
    const changePerPage = ()=>{
        setPerChanged(!isPerChangse)
    }
    const handlePerPage =e =>{
       console.log(perPageInput)
    dispatch(actions.changePerPageValue(perPageInput))
        setPerChanged(false)
        
    }
    const handleChangePer=(e)=>{
        console.log('onchange',e.target.value)
        setPerPageInput(e.target.value)
    }
    useEffect(()=>{
        if(perPageChange){
    setTimeout(()=>{
            dispatch(actions.setPerPageFalse())
        },2300)          
        }
    },[perPageChange])
    return(
        <div className='button_section'>
        {mainPage !== 1 && 

        <i  onClick={prevPage} className="bi bi-chevron-left next_button"></i>}
            {numOfButtons >1 && filteredButtons.map((e)=>(
            <div key={e}>
            <button  className={mainPage === e ? 'btn btn-primary':'btn'} onClick={()=>handlePage(e)} >{e}</button>
            </div>
            ))}
            { mainPage !== buttons.length && buttons.length &&  <i className="bi bi-chevron-right next_button" onClick={nextPage}></i>} 
         <div className='show_all'> 
            <button className='btn btn-success' onClick={showAll}>{ areTodosAll  ? t('hideAll'): t('showAll')}</button></div>
            {isPerChangse  && <input  type='number' onChange ={handleChangePer} /> }     
          <div>
              {!isPerChangse ?   <button onClick={changePerPage} className='btn btn-secondary ' style={{marginTop:'15px'}}>{t('ChangePerPage')} </button> : 
     <button  type='button' onClick={handlePerPage}  className='btn btn-secondary'>{t('submitPer')}</button>}
                                                                                                                      {perPageChange &&  <div>You can't change per page</div>} 
          </div>
        </div>
    )
}