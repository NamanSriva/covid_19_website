const xlabels=[];
const ycases=[];

    chartIt();

    async function chartIt(){
        await getData();
const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels : xlabels,
        
        datasets: [{
            label: 'Vaccinated',
            data:ycases,
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
               
            
            borderColor: 
                'rgba(255, 99, 132, 1)',
                
            borderWidth: 1
        }]
    }, 
});
    }



async function getData(){
const response= await fetch('csvfiles/vacc.csv');
    const data=await response.text();

    const rows=data.split('\n').slice(1);
    rows.forEach(elt=>{
       const row=elt.split(','); 
       const TOTAL_VACCINATIONS=row[5];
       ycases.push(TOTAL_VACCINATIONS);
       const COUNTRY=row[0];
       xlabels.push(COUNTRY);
       
       console.log(TOTAL_VACCINATIONS, COUNTRY);
    });

}
  

