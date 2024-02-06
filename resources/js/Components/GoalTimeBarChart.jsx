import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import TimeFormatter from "@/Components/TimeFormatter";

export default function GoalTimeBarChart({week_time, goal_time}) {
    const completed = (parseFloat(week_time) / goal_time) * 100;
    const failed = 100 - completed;
    
    let data;
    
    if (completed >= 100) {
        data = [{ completed: 100, failed: 0 }];
    } else {
        data = [{ completed: completed, failed: failed }];
    }

    return (
        <div className="w-5/6 m-auto bg-white rounded-md overflow-hidden text-center">
            {goal_time ? (
                <div className="h-52">
                    <div className="p-2 bg-gray-200">目標時間</div>
                    {completed >= 100 ? (
                        <div className="p-2 font-medium bg-yellow-200">
                            <TimeFormatter time={goal_time} /> 達成しました！
                        </div>
                    ) : (
                        <div className="p-2">
                            <TimeFormatter time={week_time} /> / <TimeFormatter time={goal_time} />
                        </div>
                    )}
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
                </div>
            ) : (
                <div>
                    <div className="p-2 bg-gray-200">目標時間</div>
                    <div className="p-5">目標時間を設定してください</div>
                </div>
            )}
        </div>
    );
}