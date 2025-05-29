const ctx = document.getElementById('ihsgChart').getContext('2d');
const ihsgChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Harga IHSG (Rp)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [],
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgba(231, 111, 81, 1)',
            pointRadius: 5,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Waktu',
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'Roboto'
                    },
                    color: '#264653'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Harga IHSG (Rp)',
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: 'Roboto'
                    },
                    color: '#264653'
                },
                beginAtZero: false
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14
                    },
                    color: '#333'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(42, 157, 143, 0.9)',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 5
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutBounce',
        }
    }
});

async function fetchIHSGData(range, interval) {
    const response = await fetch(`/ihsg-data?range=${range}&interval=${interval}`);
    const data = await response.json();

    ihsgChart.data.labels = data.time;
    ihsgChart.data.datasets[0].data = data.close;
    ihsgChart.update();

    const percentageChangeDiv = document.getElementById('percentageChange');
    if (data.percentage_change !== null) {
        percentageChangeDiv.innerHTML = `Perubahan: ${data.percentage_change.toFixed(2)}%`;
    } else {
        percentageChangeDiv.innerHTML = 'Tidak ada data untuk ditampilkan.';
    }
}

function updateChart() {
    const range = document.getElementById('range').value;
    const interval = document.getElementById('interval').value;
    fetchIHSGData(range, interval);
}

fetchIHSGData('1d', '1m');
