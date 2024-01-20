import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { startOfWeek, add, format } from 'date-fns';


export default function BarChartComponent({data = {}, categories = []}) {

  const format_this_week = () => {
    const default_data = [];
    
    const start_of_this_week = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      const date = format(add(start_of_this_week, { days: i}), 'yyyy-MM-dd');
      default_data.push({"date": date});
    }
    
    return default_data;
  };
  
  const data_array = Object.values(data);

  const format_time = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
      
    if (hours === 0) {
      return `${minutes} 分`;
    } 
    
    if (minutes === 0) {
      return `${hours} 時間`;
    }
    
    return `${hours} 時間 ${minutes} 分`;
  };
  
    return (
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data_array[0] || format_this_week()}
          margin={{
            top: 20,
            right: 25,
            left: 25,
            bottom: 30,
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date"
          angle={45}
          interval={0}
          tick={(props) => (
            <text
              x={props.x}
              y={props.y + 10}
              fontSize={12}
              fill="#666"
              transform={`rotate(45, ${props.x}, ${props.y})`}
            >
              {props.payload.value}
            </text>
          )}                
        />
        <YAxis 
          tick={({ x, y, payload }) => (
            <text
              x={x}
              y={y}
              textAnchor="end"
              fontSize={12}
              fill="#666"
            >
              {format_time(payload.value)}
            </text>
          )}                
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {categories.map((category) => { return (
          <Bar dataKey={category.name} stackId="a" fill={category.color} />
        )})}
      </BarChart>
    </ResponsiveContainer>
  );
}