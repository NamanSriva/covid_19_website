
const country_name_element = document.querySelector(".country .name");

const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");


const ctx = document.getElementById("axes_line_chart").getContext("2d");


let app_data = [],
  recovered_list = [],
  formatedDates = [];


fetch("https://api.ipgeolocation.io/ipgeo?apiKey=14c7928d2aef416287e034ee91cd360d")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let country_code = data.country_code2;
    let user_country;
    country_list.forEach((country) => {
      if (country.code == country_code) {
        user_country = country.name;
      }
    });
    fetchData(user_country);
  });


function fetchData(country) {
  user_country = country;
  country_name_element.innerHTML = "Loading...";

    (recovered_list = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/recovered",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          recovered_list.push(entry.Cases);
        });
      });

    updateUI();
  };

  api_fetch(country);
}

function updateUI() {
  updateStats();
  axesLinearChart();
}

function updateStats() {

  const total_recovered = recovered_list[recovered_list.length - 1];
  const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];

  country_name_element.innerHTML = user_country;
  recovered_element.innerHTML = total_recovered;
  new_recovered_element.innerHTML = `+${new_recovered_cases}`;

 
  dates.forEach((date) => {
    formatedDates.push(formatDate(date));
  });
}

let my_chart;
function axesLinearChart() {
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Recovered",
          data: recovered_list,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 1,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);

  return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}