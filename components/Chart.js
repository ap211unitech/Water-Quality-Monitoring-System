import { CChart } from '@coreui/react-chartjs';
import { useEffect, useState } from 'react';
import moment from 'moment';

const Chart = ({ chartData: { data, location, type } }) => {

    if (data === undefined || data?.dates.length === 0 || data?.liveData.length === 0) return <></>;

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
                    labels: data?.dates.map(liveDate => moment(liveDate).format("DD/MM/YYYY")), // Dates goes here
                    datasets: [
                        {
                            label: `${chartLabel} of water at different days at ${location}`,
                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                            borderColor: "rgba(151, 187, 205, 1)",
                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                            pointBorderColor: "#fff",
                            data: data?.liveData,
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