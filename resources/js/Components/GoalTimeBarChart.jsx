import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';


export default function GoalTimeBarChart({week_time, goal_time}) {
    
    const completed = (week_time / goal_time) * 100;
    const failed = 100 - completed;
    
    const data = [
        { completed: completed, failed: failed },
    ];

    return (
    <ResponsiveContainer width="100%" height="60%">
        <BarChart
            data={data}
            margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}
            layout="vertical"
        >
            <XAxis
                type="number"
                orientation="bottom"
                stroke="#285A64"
            />
            <YAxis
                type="category"
                hide={true}
            />
            <CartesianGrid
                stroke="#f5f5f5"
             /> 
            <Bar
                dataKey="completed"
                stackId="a"
                barSize="100%"
                fill="#2563EB"
            />
            <Bar
                dataKey="failed"
                stackId="a"
                barSize="100%"
                fill="#ffffff"
            />
        </BarChart>
    </ResponsiveContainer>
  );
}