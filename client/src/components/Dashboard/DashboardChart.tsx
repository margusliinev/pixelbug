import { BarChart, Card, Subtitle, Title } from '@tremor/react';

interface ChartData {
    name: string;
    Tickets: number;
}

const DashboardChart = ({ chartData }: { chartData: ChartData[] }) => {
    return (
        <Card>
            <Title>Number of tickets per project</Title>
            <Subtitle>Tickets can be either bug reports or feature requests</Subtitle>
            <BarChart className='mt-6' data={chartData} index='name' categories={['Tickets']} colors={['emerald']} yAxisWidth={24} />
        </Card>
    );
};

export default DashboardChart;
