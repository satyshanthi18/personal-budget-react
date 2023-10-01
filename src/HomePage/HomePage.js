import React , { useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; 
import * as d3 from 'd3'; 

function HomePage() {

    var data = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fc6b19',
                    '#ff5733',
                    '#117a65',
                    '#9b59b6'
                ],
            }
        ],
        labels: []
        }

    const createChart = () => {
        var ctx = document.getElementById("myChart");
        const w = 350;
        const h = 300;
        const myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            width: w,
            height: h
        });
      }

    const createD3Chart = () => {
        const w = 350;
        const h = 300;
        const r = Math.min(w, h) / 2;
  
        const color = d3.scaleOrdinal().domain(data.labels).range(data.datasets[0].backgroundColor);
  
        const svg = d3.select('.D3JSChart').append('svg').attr('width', w).attr('height', h).append('g').attr('transform', `translate(${w / 2},${h / 2})`);
  
        const pie = d3.pie().value((d) => d);
  
        const arc = d3.arc().innerRadius(r - 50).outerRadius(r);
  
        const arcs = svg.selectAll('arc').data(pie(data.datasets[0].data)).enter().append('g').attr('class', 'arc');
  
        arcs
          .append('path')
          .attr('d', arc)
          .attr('fill', (d, i) => color(i));
  
        arcs
          .append('text')
          .attr('transform', (d) => `translate(${arc.centroid(d)})`)
          .attr('text-anchor', 'middle')
          .text((d, i) => data.labels[i]);
    };


  useEffect(() => {
    axios.get("http://localhost:3001/budget")
    .then(res => {
        console.log(res.data)
        for (var i = 0; i < res.data.budget.length; i++) {
            data.labels.push(res.data.budget[i].title);
            data.datasets[0].data.push(res.data.budget[i].budget);
        }
        createD3Chart()
        createChart()
    })
  }, [])


  return (
    <main className="center" id="main">
    {console.log('HTML Element')}
    <div>

        <div className="text-box">
            <h1>Stay on Track</h1>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data...
            </p>
        </div>

        <div className="text-box">
            <h1>Alerts</h1>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>
        </div>

        <div className="text-box">
            <h1>Results</h1>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear... 
                because they know it is all good and accounted for.
            </p>
        </div>

        <div className="text-box">
            <h1>Chart</h1>
            <p>
                <canvas id="myChart"></canvas>
            </p>
        </div>

        <h1>D3 Chart</h1>
        <div className='D3JSChart'> </div>
        

    </div>

</main>
  );
}

export default HomePage;
