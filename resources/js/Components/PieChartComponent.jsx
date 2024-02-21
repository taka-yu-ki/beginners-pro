import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import TimeFormatter from "@/Components/TimeFormatter";

export default function PieChartComponent({pie_chart_data}) {
    
    // 各データのパーセントを中央に配置する処理
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            {pie_chart_data && pie_chart_data.length !== 0 ? (
            <div className="h-[400px] sm:h-96 p-2 sm:px-5 sm:py-2 bg-white sm:rounded-md">
                <div className="w-full h-1/2 m-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pie_chart_data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="time"
                                startAngle={90}
                                endAngle={-270}              
                            >
                                {pie_chart_data.map((data, index) => (
                                    <Cell key={`cell-${index}`} fill={data.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full h-1/2 overflow-y-scroll">
                    <table className="w-full table-fixed">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-300">
                                <th className="py-2 px-4 font-normal">カテゴリー</th>
                                <th className="py-2 px-4 font-normal">時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pie_chart_data.map((data, index) => (
                                <tr key={index} style={{ color: data.color }} className="border text-center">
                                    <td className="py-2 px-4 font-medium">{data.name}</td>
                                    <td className="py-2 px-4 font-medium">
                                        <TimeFormatter time={data.time} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className="h-96 p-5 bg-white rounded-md flex items-center justify-center">
                データがありません
            </div>
        )}
        </div>
    );
}