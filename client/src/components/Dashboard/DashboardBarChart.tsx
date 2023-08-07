import { BarChart, Card, Subtitle, Title } from '@tremor/react';

interface ChartData {
    name: string;
    Tickets: number;
}

const DashboardBarChart = ({ chartData }: { chartData: ChartData[] }) => {
    const isMobile = window.innerWidth < 500;
    return (
        <Card>
            <Title>Number of tickets per project</Title>
            <Subtitle>Tickets can be either bug reports or feature requests</Subtitle>
            <BarChart
                className='mt-6'
                data={isMobile ? chartData.slice(0, 3) : chartData}
                index='name'
                categories={['Tickets']}
                colors={['emerald']}
                yAxisWidth={32}
            />
        </Card>
    );
};

export default DashboardBarChart;
