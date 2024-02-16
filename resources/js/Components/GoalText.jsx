export default function GoalText({goal_text}) {
    return (
        <div>
            <div className="sm:w-5/6 m-auto bg-white sm:rounded-md overflow-hidden text-center">
                <div className="p-2 bg-gray-200">目標</div>
                {goal_text ? (
                    <div className="p-5 text-xl font-bold">{goal_text}</div>
                ) : (
                    <div className="p-5">目標を設定してください</div>
                )}
            </div>
        </div>
    );
}