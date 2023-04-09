import { CChart } from '@coreui/react-chartjs';
import { useEffect, useState } from 'react';

const Chart = ({ chartData: { data, location, type } }) => {

    const [chartLabel, setChartLabel] = useState('');
    useEffect(() => {
        if (type === 'ph') {
            setChartLabel('pH')
        }
        else if (type === 'temp') {
            setChartLabel('Temperature')
        }
        else if (type === 'tds') {
            setChartLabel('TDS')
        }
    }, [type])

    return (
        <div style={{
            margin: '30px auto 50px auto'
        }}>
            <CChart
                type="line"
                data={{
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Dates goes here
                    datasets: [
                        {
                            label: `${chartLabel} of water at different days at ${location}`,
                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                            borderColor: "rgba(151, 187, 205, 1)",
                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                            pointBorderColor: "#fff",
                            data: data.map(d => d),
                        },
                    ]
                }}
                options={{
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Dates at which data is taken',
                                font: {
                                    size: 16
                                }
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: `${chartLabel} of water`,
                                font: {
                                    size: 16
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default Chart