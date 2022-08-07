
import { createSlice,current,createAsyncThunk } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name:'todos',
    initialState:{
     todos:/* localStorage.getItem('todos') ? 
     JSON.parse(localStorage.getItem('todos')) : */[], 
     nameInput:'',
     filterTodosText:'Filter todos',
     todoDate:'',
     perPage:3,
     page:1,
     selectedWeekMonth:'Select a month',
     doneTodos:[],
     modDone:[],
     tuesDone:[],
  wedDone:[],
  thursDone:[],
  friDone:[],
  saturDone:[],
  sunDone:[],
     pages:[],
     mainObjResult:[],
     filterOptions:[
         {name:'All'},
         {name: 'Completed'},
         {name:'Favourites'},
         {name:'Uncompleted'}
     ],
     filteredTodos:[],
     newName:'',
     startDate:[],
     doneTodosLength:[],
     endDate:[],
     genLength:[],
     areMonthVisible:false,
    selectedWeekRange:'Choose a week',
    weekendDays:
  /*      localStorage.getItem('progressData') ? 
    JSON.parse(localStorage.getItem('progressData') ): */
  
       [
         {name:'Monday',percent:0},
          {name:'Tuesday',percent:0},
          {name:'Wednesday',percent:0},
          {name:'Thursday',percent:0},
          {name:'Friday',percent:0},
          {name:'Saturday',percent:0},
          {name:'Sunday',percent:0}
     ], 
     filteredWeekends:[],
areWeekVisible:false,
     setEdit:false,
        isWeekChoosen:false,
     fromButton:0,
     toButton:3,
     mainPage:1,
     areTodosAll:false,
        isFilterChoosen:false,
        weekendMonth:[
            {name:'January'},
            {name:'February'},
            {name:'March'},
            {name:'April'},
            {name:'May'},
            {name:'June'},
            {name:'July'},
            {name:'August'},
            {name:'September'},
            {name:'October'},
            {name:'November'},
            {name:'December'},
        ],
        numOfButtons:1,
        paginatedLength:0,
        errors:{
            perPageChange:false
        }
 },
reducers:{
   handleName(state,{payload}){
      state.nameInput = payload
  },
    handleDateInput(state,{payload}){
        state.todoDate = payload
        console.log('state todo date',state.todoDate)
    },
    onMountPaginationButtons(state,action){
      state.numOfButtons =Math.ceil( state.todos.length / state.perPage ) 
        state.paginatedLength = state.todos.length
    },
    addTodos(state,{payload}){
        if(state.nameInput.length && payload){
        state.todos = [...state.todos,{
            name:state.nameInput,
            isDone:false,
            isFavourite:false,
            id:state.todos.length +1,
            dateNow:payload
        }]   
        }
        state.filteredTodos = [...state.todos]
    
        state.numOfButtons = state.todos.length / state.perPage
let weekNumObj = state.weekendDays.reduce((acc,rec,i)=>(
    {...acc,[i+1]:rec}
),{})

let filterNames=[]

filterNames = state.todos.map((e)=>weekNumObj[e.dateNow.weekDay].name)
.filter((e,i,arr)=>arr.indexOf(e)==i)
        
let mainObjResult=[]
let modArr=[]
let tuesArr=[]
let wedArr=[]
let thurArr=[]
let fridArr=[]
let saturArr=[]
let sunArr=[]


 let   modDone=[]
 let tuesDone=[]
 let wedDone=[]
 let thursDone=[]
 let friDone=[]
 let saturDone=[]
 let sunDone=[]         

//console.log('weekendMonthObj',weekendMonthObj)   
        
 state.todos.map((e,i)=>{
 
   
        if(weekNumObj[e.dateNow.weekDay].name === 'Monday'){
     modArr.push(e)
  e.isDone && modDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Tuesday'){
      tuesArr.push(e)
        e.isDone && tuesDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Wednesday'){
   wedArr.push(e)
  e.isDone && wedDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Thursday'){
 thurArr.push(e)
   e.isDone && thursDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Friday'){
     fridArr.push(e)
       e.isDone && friDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Saturday'){
    saturArr.push(e)
    e.isDone && saturDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Sunday'){
   sunArr.push(e)
     e.isDone && sunDone.push(e)
  }
   
})
        
state.genLength=[
  modArr.length,
tuesArr.length,
 wedArr.length,
 thurArr.length,
 fridArr.length,
 saturArr.length,
 sunArr.length,
]

state.doneTodos=[
   
  modDone.length,
  tuesDone.length,
  wedDone.length,
  thursDone.length,
  friDone.length,
  saturDone.length,
  sunDone.length, 
  ]

state.weekendDays.forEach((e,i)=>{
    let percent;
  percent=Math.ceil(state.doneTodos[i]*100 / state.genLength[i])
 
  mainObjResult.push(
    {
      name:state.weekendDays[i].name,
      total: state.genLength[i],
       doneTodos:state.doneTodos[i],
    percent:percent ? percent : 0
    })
})
        state.weekendDays=[...mainObjResult]

    } ,
    setToNull(state,action){
        state.nameInput=''
        state.todoDate=''   
    },
    doneTodo(state,{payload}){
        state.todos= state.todos.map((e)=>{
            if(e.id === payload.id){
                return {
                    ...e,isDone:!e.isDone
                }
            }else{
                return e;
            }
        })
        state.filteredTodos=[...state.todos]

 let weekNumObj = state.weekendDays.reduce((acc,rec,i)=>(
    {...acc,[i+1]:rec}
),{})

let filterNames=[]

filterNames = state.todos.map((e)=>weekNumObj[e.dateNow.weekDay].name)
.filter((e,i,arr)=>arr.indexOf(e)==i)
        
let mainObjResult=[]

let doneTodos=[]
let modArr=[]
let tuesArr=[]
let wedArr=[]
let thurArr=[]
let fridArr=[]
let saturArr=[]
let sunArr=[]


 let   modDone=[]
 let tuesDone=[]
 let wedDone=[]
 let thursDone=[]
 let friDone=[]
 let saturDone=[]
 let sunDone=[]
 state.todos.map((e,i)=>{

    if(weekNumObj[e.dateNow.weekDay].name === 'Monday'){
     modArr.push(e)
  e.isDone && modDone.push(e)
 
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Tuesday'){
      tuesArr.push(e)
        e.isDone && tuesDone.push(e)

  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Wednesday'){
   wedArr.push(e)
  e.isDone && wedDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Thursday'){
 thurArr.push(e)
   e.isDone && thursDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Friday'){
     fridArr.push(e)
       e.isDone && friDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Saturday'){
    saturArr.push(e)
    e.isDone && saturDone.push(e)
  }
    if(weekNumObj[e.dateNow.weekDay].name === 'Sunday'){
   sunArr.push(e)
     e.isDone && sunDone.push(e)
  }
})

state.genLength=[
  modArr.length,
tuesArr.length,
 wedArr.length,
 thurArr.length,
 fridArr.length,
 saturArr.length,
 sunArr.length,
]
doneTodos=[
  modDone.length,
  tuesDone.length,
  wedDone.length,
  thursDone.length,
  friDone.length,
  saturDone.length,
  sunDone.length,
  ]


state.weekendDays.forEach((e,i)=>{
    let percent;
  percent=Math.ceil(doneTodos[i]*100 / state.genLength[i])
  mainObjResult.push(
    {
      name:state.weekendDays[i].name,
      total: state.genLength[i],
       doneTodos:doneTodos[i],
        percent:percent ? percent : 0
    })
})
        state.weekendDays=[...mainObjResult]

  console.log('week',state.weekendDays)
//localStorage.setItem('progressData',JSON.stringify(state.weekendDays))

        



    },
    favTodo(state,{payload:todo}){
         state.todos=  state.todos.map((e)=>{
            if(e.id === todo.id){
                return {
         ...e, isFavourite : !e.isFavourite
                }
            }return e
        })
          state.filteredTodos=[...state.todos]
      
    },
    editTodo(state,{payload}){
   state.newName=payload.name;
    state.setEdit = payload.id
      
    },
    filterTodos(state,{payload}){
       state.isFilterChoosen = true;
       state.filterTodosText = payload.name
        console.log('payload',payload)
if(payload.name ==='Completed' ||  payload.name ==='Завершенные' ){
    state.filteredTodos=state.todos.filter((e)=>e.isDone==true)
    state.numOfButtons = Math.ceil(state.filteredTodos.length / state.perPage)
state.paginatedLength = state.filteredTodos.length
}
else if (payload.name==='Uncompleted' || payload.name==='Незавершенные'){
state.filteredTodos=state.todos.filter((e)=>!e.isDone
    )      
        state.numOfButtons = Math.ceil(state.filteredTodos.length / state.perPage)
    state.paginatedLength = state.filteredTodos.length
}
    else if (payload.name==='Favourites' || payload.name==='Избранные'){
state.filteredTodos=state.todos.filter((e)=>
    e.isFavourite)    
            state.numOfButtons = Math.ceil(state.filteredTodos.length / state.perPage)
        console.log('numOfButton in favourites', state.numOfButtons)
        state.paginatedLength = state.filteredTodos.length
}   
    else if(payload.name === 'All' || payload.name==='Все' ){
     state.filteredTodos=[...state.todos]    
}
else{   
    return;
}
    },
    setFilteredTodos(state,action){
        state.filteredTodos=[...state.todos]
    },
    handleChangedName(state,{payload}){
      state.newName = payload ;
    
    },
    handleNewName(state,{payload}){
       state.todos= state.todos.map((e)=>{
            if(e.id === payload.id){
                return {...e,name:state.newName}
            }return e;
        })
        state.newName=''
        state.setEdit=false;
        state.filteredTodos=[...state.todos]
        
    },
    filterByDate(state,action){
        console.log('in action',current(state))
        let todoDay;
        let todoMonth;
    state.filteredTodos = state.todos.filter((e)=>{
        todoDay = e.dateNow.day
        todoMonth = e.dateNow.month
        if(state.startDate[1] === state.endDate[1] && 
           state.startDate[0] <= +todoDay &&
            state.startDate[1] === +todoMonth  &&
           state.endDate[0] >= +todoDay &&
             state.endDate[1] === +todoMonth
          ) {
            return e
          }
      else if(
       state.startDate[1] !== state.endDate[1] 
       ){
        if(+todoMonth === state.startDate[1] &&
          state.startDate[0] <= +todoDay){
     return e;
       }     
        else if(+todoMonth === state.endDate[1] &&
        state.endDate[0] >=+todoDay
        ){
            return e;
}
}
     })
        state.numOfButtons = Math.ceil(state.filteredTodos.length / state.perPage)
  state.paginatedLength = state.filteredTodos.length
    },
    paginateTodo(state,{payload}){
   state.page = payload;
    console.log(state.page)
    console.log('payload',payload)
},
    handleDate(state,{payload}){

        let {startMonth,endMonth, startDay,endDay}= payload
        
        state.startDate=[startDay,startMonth]
        state.endDate=[endDay,endMonth]
      
    },
    handlePage(state,{payload}){
        state.mainPage = payload;
        state.page = payload
       if(payload === 1) return;
        else if (payload >1 && payload === state.toButton){
            state.fromButton +=1
            state.toButton +=1
        }
   else if( payload > 1 && payload === state.fromButton+1){
    state.fromButton -=1
            state.toButton -=1
        } 

          },
    nextPage(state,actions){
            state.fromButton+=1
            state.toButton+=1
            state.mainPage+=1
            state.page+=1
            console.log('nextButton',state.mainPage)
        },
    prevPage(state,{payload}){
           if(state.mainPage !== 1){
               if(state.mainPage > 1){
                   state.fromButton =0
                   state.toButton =3
               }
            state.mainPage-=1
            state.page-=1
           }
    },
    showAll(state,action){
       state.areTodosAll=!state.areTodosAll
      if(state.areTodosAll){
        state.page=1;
        state.perPage = state.todos.length 
        state.mainPage=1;
        state.numOfButtons=1;
        state.fromButton =0;
        state.toButton = state.todos.length + 1
      }else{
          state.perPage = 3;
          state.toButton=3;
          state.numOfButtons=Math.ceil(state.todos.length / state.perPage)
        state.paginatedLength = state.todos.length
      }
        console.log(current(state))
    },
    makeMonthVisible(state,action){
        state.areMonthVisible = !state.areMonthVisible
    },
    chooseWeekMonth(state,{payload}){
        state.selectedWeekMonth=payload;
        console.log('choosing month',payload)
        state.areWeekVisible = true;
        state.areMonthVisible=false
    },
    makeWeekDayVisible(state,action){
        state.isWeekChoosen = !state.isWeekChoosen
    },
    changePerPageValue(state,{payload}){
              state.numOfButtons = Math.ceil(state.todos.length / state.perPage)
        console.log('payload in changePerPageValue',payload)
     if(+payload <= state.filteredTodos.length  && +payload <= state.todos.length){
        state.perPage = +payload
        state.numOfButtons = Math.ceil(state.filteredTodos.length / state.perPage)
     }else{
          state.errors.perPageChange= true;
      
     }
    },
    setPerPageFalse(state){
        state.errors.perPageChange= false;
    }
}

    })


    export default todoSlice