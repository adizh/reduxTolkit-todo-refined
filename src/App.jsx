import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import DayNightToggle from 'react-day-and-night-toggle'
import './App.css';
import { useTranslation, Trans } from 'react-i18next';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Main from './components/Main.jsx'
import DateRange from './components/DateRange.jsx'
import Weekends from './components/Weekends.jsx'
import Pagination from './components/Pagination.jsx'

function App() {

const lngs = {
  en: { nativeName: 'English',code:'us'},
  ru: { nativeName: 'Russian' ,code:'ru'}
};
          
  const { t, i18n } = useTranslation(); 
  const [isDarkMode, setIsDarkMode] = 
    React.useState(false)

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? 'dark' : 'light'

    setIsDarkMode(newColorScheme === 'dark' ? true : false)
    localStorage.setItem('data-theme', newColorScheme)
    document.body.setAttribute('data-theme', localStorage.getItem('data-theme'))
  })

  const handleChangeTheme = () => {
    setIsDarkMode(!isDarkMode)
    if(!isDarkMode) {
      localStorage.setItem('data-theme', 'dark')
      document.body.setAttribute('data-theme', 'dark')
    } else {
      localStorage.setItem('data-theme', 'light')
      document.body.setAttribute('data-theme', 'light')
    }
  }
    
const changeLocale=(lng) => {
              i18n.changeLanguage(lng);
             window.location.reload() 
         }
  return (
    <div>
           <DayNightToggle
      onChange={handleChangeTheme}
      checked={isDarkMode}
    />
         <div className='switch_lan'>
          {Object.keys(lngs).map((lng) => (
            <button className='flag_button' key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={()=>changeLocale(lng)}>
              <MDBIcon flag={lngs[lng].code} />
       
            </button>
          ))}
          
        </div>
       
       <DateRange/>
        <Weekends/>
        <Main/>
        <Pagination/>
    </div>
  );
}

export default App;