
 let Alphapet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 let name = document.getElementById('name')
 input = document.getElementById('input')
 btn = document.getElementById('btn')
 btn.addEventListener('click',function(e){
  let overall_seconds = []
  let overall_minutes = []
  let overall_hours = []
  let nextPageToken = ''
   e.preventDefault()
   let url_03 = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&part=contentDetails&id='+input.value+'&maxResults=10&key=AIzaSyAs4V-sKOxoMLGcjoJBoWxCxOTl2sWeloU'
   fetch(url_03).then(data=>{return data.json()}).then(res=>{name.innerHTML = res.items[0].snippet.title})
   let ids =''
   const url ='https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAs4V-sKOxoMLGcjoJBoWxCxOTl2sWeloU&playlistId='+input.value+'&part=snippet&part=contentDetails&maxResults=100'
   let temp
   while(true){
     yeah = false
     fetch(url).then(data=>{return data.json()}).then(res=>{
       console.log(res.snippet)
       nextPageToken = res.nextPageToken
       for(variable in res.items){
       ids = ids +res.items[variable].contentDetails.videoId+','
       temp = res.nextPageToken

     }})

     setTimeout(function(){
       ids = ids.slice(0,ids.length-1)
       let url_02 = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAs4V-sKOxoMLGcjoJBoWxCxOTl2sWeloU&part=contentDetails&id='+ids
       fetch(url_02).then(data=>{return data.json()}).then(res=>{console.log(res.items)
         for(variable in res.items){
           let dura = res.items[variable].contentDetails.duration
           console.log(variable +''+ dura)

           if (dura.includes('H')){
             hours_pos = dura.indexOf('H')
             let hours = dura.slice(hours_pos-2,hours_pos)
             if (Alphapet.includes(hours[0])){
               hours = hours.slice(1)
             }
             overall_hours.push(hours)
           }
           if (dura.includes('M')){
             minutes_pos = dura.indexOf('M')
             let minutes = dura.slice(minutes_pos-2,minutes_pos)
             if (Alphapet.includes(minutes[0])){
               minutes = minutes.slice(1)
             }
             overall_minutes.push(minutes)
           }

           if (dura.includes('S')){
             seconds_pos = dura.indexOf('S')
             let seconds = dura.slice(seconds_pos-2,seconds_pos)
             if (Alphapet.includes(seconds[0])){
               seconds = seconds.slice(1)
             }
             overall_seconds.push(seconds)
           }


         }

       })
     },3500)

     setTimeout(function(){
       console.log(overall_hours)
       let sum_seconds = 0
       let sum_minutes = 0
       let sum_hours = 0
       for(variable in overall_minutes){
         sum_minutes = sum_minutes + parseInt(overall_minutes[variable])
         console.log("here : "+ sum_minutes+'..'+variable)
       }
       for(variable in overall_seconds){
         sum_seconds = sum_seconds + parseInt(overall_seconds[variable])
         console.log("hereeeeee : "+ sum_seconds+'..'+variable)
       }

       for(variable in overall_hours){
         sum_hours = sum_hours + parseInt(overall_hours[variable])
       }
     console.log(sum_seconds)
     console.log(sum_minutes)
     console.log(sum_hours)

      let final_minutes = Math.floor(sum_seconds/60)
      sum_seconds = sum_seconds - final_minutes*60
      sum_minutes = sum_minutes+final_minutes
      let final_hours = Math.floor(sum_minutes/60)

     sum_minutes = sum_minutes - final_hours*60
     // sum_minutes = sum_minutes + final_minutes
     document.getElementById('duration').innerHTML = final_hours+':'+sum_minutes+':'+sum_seconds;

     },4500)
     if (!temp){
       break;
     }
   }




 })


