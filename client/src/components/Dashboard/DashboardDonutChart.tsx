import { Card, DonutChart, Title } from '@tremor/react';

interface ChartData {
    name: string;
    Tickets: number;
}
const valueFormatter = (number: number) => (number === 1 ? `${number} Ticket` : `${number} Tickets`);

const DashboardDonutChart = ({ chartData }: { chartData: ChartData[] }) => (
    <Card className='h-full grid place-items-center'>
        <Title className='absolute left-8 top-8'>Tickets by priority</Title>
        <DonutChart
            className='h-4/6'
            data={chartData}
            category='Tickets'
            index='name'
            colors={['emerald', 'yellow', 'rose', 'red']}
            valueFormatter={valueFormatter}
            showTooltip={true}
            showAnimation={false}
        />
    </Card>
);

export default DashboardDonutChart;
