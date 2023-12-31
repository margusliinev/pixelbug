import { Card, DonutChart, Title } from '@tremor/react';

interface ChartData {
    name: string;
    Tickets: number;
}
const valueFormatter = (number: number) => (number === 1 ? `${number} Ticket` : `${number} Tickets`);

const DashboardDonutChart = ({ chartData }: { chartData: ChartData[] }) => (
    <Card className='h-full relative grid'>
        <Title className='absolute left-8 top-8'>Tickets by Priority</Title>
        <DonutChart
            className='h-[250px] w-full absolute self-center font-medium'
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
