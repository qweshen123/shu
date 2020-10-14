export function changTime(time){
    let mount = Number(time.substring(5,7))
        let day = Number(time.substring(8,10))
        let date = new Date()
        let currentMount = Number(date.toLocaleDateString().substring(5,7))
        let currentDay = Number(date.toLocaleDateString().substring(8,10))
        let restMount = (currentMount - mount)*30
        let restDay = null
        let countDay = null
        if(currentDay >= day){
            restDay = currentDay - day
            countDay = restDay + restMount
        }else{
            countDay =  (restMount-day) + currentDay
        }
        if(countDay == 0){countDay = '今天'}else{countDay = countDay + '天前'}

        return [mount,day,currentMount,currentDay,countDay]
}