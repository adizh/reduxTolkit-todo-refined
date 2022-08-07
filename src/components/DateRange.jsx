import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {actions} from '../redux/redux.js'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 

import { useTranslation } from 'react-i18next';
export default function DateRangeCompon(){
    const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  
    const dispatch=useDispatch()
    const todos = useSelector(s=>s.todos.todos)
    const startDate1 = useSelector(s=>s.todos.startDate)
    const endDate1 = useSelector(s=>s.todos.endDate)
  
    const handleDate=(update) => {
            setDateRange(update)
        let startMonth = new Date(update[0])
        let startDay=new Date(update[0])
        let endDay= new Date(update[1])
        let endMonth= new Date(update[1])
        startMonth = startMonth.getMonth() +1
        endMonth = endMonth.getMonth() + 1
        startDay = startDay.getDate()
        endDay = endDay.getDate()
        dispatch(actions.handleDate({startMonth,
         startDay,
         endDay,
         endMonth}))
 
      }
    
    const filterDate=()=>{
         dispatch(actions.filterByDate(todos))
    }
 /*    useEffect(()=>{
        endDate1[0] && endDate1[1] && setTimeout(()=>{
            setCalen(false)
        },3000)
    },[endDate1]) */
    const handleDateRange =item => {
            setState([item.selection])    
        console.log(item.selection)
        const {startDate,endDate} = item.selection;
        console.log('starDate',startDate)
       let startMonth = new Date(startDate)
         let startDay=new Date(startDate)
        let endDay= new Date(endDate)
        let endMonth= new Date(endDate)
        startMonth = startMonth.getMonth() +1
        endMonth = endMonth.getMonth() + 1
        startDay = startDay.getDate()
        endDay = endDay.getDate()
        console.log(startDay,startMonth,endDay,endMonth)
        dispatch(actions.handleDate({startMonth,
         startDay,
         endDay,
         endMonth})) 
         }
      const { t } = useTranslation();
    const [show,setShow]=useState(false)
  return (
      <div className='dateRange'  >
          <button className='btn btn-success filter_date_btn' onClick={()=>setShow(!show)}>{t('filterDate')}</button>
          {show &&  <>  <DateRange
  editableDateInputs={true}
  onChange={handleDateRange}
  moveRangeOnFirstSelection={false}
  ranges={state}
showDateDisplay={false}
/>
                
          <button className='btn btn-info filter_date_btn' onClick={filterDate} type='button'>{t('Filter')}</button>
          </>
          }
          
      </div>
  )
}