export default function GoalText({goal_text}) {
    return (
        <div className="w-5/6 m-auto mb-10 bg-white rounded-md overflow-hidden text-center">
            <div className="p-2 bg-gray-200">目標</div>
            {goal_text ? (
                <div className="p-5 text-xl font-bold">{goal_text}</div>
            ) : (
                <div className="p-5">目標を設定してください</div>
            )}
        </div>
    );
}