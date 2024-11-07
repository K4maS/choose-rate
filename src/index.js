import './styles/styles.scss';

const buttons = document.querySelectorAll('.action-btn');

const onClick = (e)=> {
    const rateEelem = e.target.closest('.rates__item');

    if(rateEelem) {
        const titleElement = rateEelem.querySelector('.item__title');
        if(titleElement) {
            const  rateTitle = titleElement.textContent
            console.log(rateTitle);
            alert(rateTitle)
        } else {
            console.log('Название тарифа не найдено')
        }
    } else { console.log('Класс компонента не найден')}
};

buttons.forEach(button => {
    button.addEventListener ('click', onClick )
}) 


const dateFormat = (date)=> {
    return  date.toString().padStart(2, '0');
}

const doRender =(hours, minutes, seconds) => {

    const nowTime =  `${dateFormat(hours)}:${dateFormat(minutes)}:${dateFormat(seconds)}` 
    const timerData = document.querySelector('.timer-data');
     
    if(timerData) {
        timerData.textContent = nowTime;
    }
};

const doTimer = () => {
    const date = new Date();

  
    
    let hours =  date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
 

   
        doRender(hours, minutes, seconds);

        const  interval = setInterval(()=> {
   
            if(0 >= hours && 0 >= minutes && 0 >= seconds) {
                clearInterval(interval);
                
                buttons[2].setAttribute('disabled', 'disabled');
            }
              doRender(hours, minutes, seconds); 
            seconds -= 1;
            if(seconds < 0) {
                seconds = 59;
                minutes  -= 1;
            }

            if(minutes < 0) {
                minutes = 59;
                hours  -= 1;
            }
           

          
        } , 1000)

}

doTimer()
 