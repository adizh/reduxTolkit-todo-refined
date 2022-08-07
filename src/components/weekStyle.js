 const  weekStyle =(percentage)=> {
    return {rotation: 0.25,
    strokeLinecap: 'butt',
    textSize: '13px',
    pathTransitionDuration: 0.5,
    pathColor: `rgba(97, 55, 208, ${percentage / 100})`,
    textColor: 'darkslateblue',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',}
  }
export {weekStyle}