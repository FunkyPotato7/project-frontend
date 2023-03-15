import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Statistic = ({statistic}) => {
    const { total_count, status_count } = statistic;

    const options = {
        responsive: true,
        plugins: {
            legend: false,
            title: {
                display: true,
                text: `Total: ${total_count}`
            },
        },
    };

    const data = {
        labels: status_count.map(({ status }) => status),
        datasets: [
            {
                label: "Statuses",
                data: status_count.map(({ count }) => count),
                backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(75, 192, 192, 0.6)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
                borderWidth: 1,
            },
        ],
    };


    return (
        <Bar options={options} data={data}/>
    );
};

export {
    Statistic
};