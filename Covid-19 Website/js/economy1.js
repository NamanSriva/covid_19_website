const xlabels=[];
const ycases=[];

    chartIt();

    async function chartIt(){
        await getData();
const ctx = document.getElementById('axes_line_chart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels : xlabels,
        
        datasets: [{
            label: 'Unemployement',
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
const response= await fetch('csvfiles/Sheet_1_Full_Data_data.csv');
    const data=await response.text();

    const rows=data.split('\n').slice(1);
    rows.forEach(elt=>{
       const row=elt.split(','); 
       const Percent_unemployed=row[3];
       ycases.push(Percent_unemployed);
       const Educational_attainment1=row[0];
       xlabels.push(Educational_attainment1);
       
       console.log(Percent_unemployed,Educational_attainment1);
    });

}
  

