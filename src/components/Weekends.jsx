
import { CircularProgressbar ,buildStyles} from "react-circular-progressbar";
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {weekStyle} from './weekStyle.js'
import {actions} from '../redux/redux.js'
import {useTranslation} from 'react-i18next'
import "react-circular-progressbar/dist/styles.css";
export default  function Weekends(){
    const [show,setShow] = useState(false)
    const weekendDays = useSelector(s=>s.todos.weekendDays)
const {t}=useTranslation()
                                                 
    return(
      <div className='weekends'>
   <button onClick={()=>setShow(!show)} className='btn btn-warning'>
       {t('showProgress')}
   </button>


           
       <div className='week_end'>
          {show && weekendDays.map((e,i)=>(
                  <div key={i}  className="progress-container"> 
        <CircularProgressbar
           value={e.percent}
           text={`${e.name} 
           ${e.percent}%`}
           styles={buildStyles(weekStyle(e.percent))} />
        </div>  
              ))}   
        </div>
      </div>
    )
}