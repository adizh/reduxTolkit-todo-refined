import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
        hello:'hello',
            Filter:'Filter',
            AddTodo:'Add Todo',
        Submit:'Submit',
            Enternewname:'Enter new name',
        noTodos:'No todos were found',
            ChangePerPage:'Change Per page',
            submitPer:'Submit',
            hideAll:'hide All',
            showAll:'show All',
            showProgress:'Progress',
            of:'of',
                 filterOptions:[
         {name:'All'},
         {name: 'Completed'},
         {name:'Favourites'},
         {name:'Uncompleted'}
     ],
        filterTodosText:'Filter todos', 
        filterDate:'Filter by date'
        }
      },
        ru:{
            translation: {
        hello:'привет',
        Filter:'Применить',
                AddTodo:'Добавить задачу',
        Enternewname:'Новое имя',
        Submit:'Добавить',
     noTodos:'Нету задач',
       ChangePerPage:'Изменить кол-во задач',
          submitPer:'Изменить',
                   hideAll:'Скрыть',
            showAll:'Все',
                showProgress:'Прогресс',
                of:'из',
                     filterOptions:[
         {name:'Все'},
         {name: 'Завершенные'},
         {name:'Избранные'},
         {name:'Незавершенные'}
     ],
         filterTodosText:'Отфильтровать по',
        filterDate:'Выбрать дату'
        }
      }
        
    }
  });

export default i18n;