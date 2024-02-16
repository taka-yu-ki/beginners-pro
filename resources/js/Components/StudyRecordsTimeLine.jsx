import { Link } from "@inertiajs/react";
import UserIcon from "@/Components/UserIcon";
import TimeFormatter from "@/Components/TimeFormatter";

export default function StudyRecordsTimeLine({is_display_time = false, today_time, month_time, total_time, study_records, user}) {
    return (
        <div className="sm:w-5/6 px-2 p-5 sm:py-10 m-auto bg-gray-200 sm:rounded-md">
            {is_display_time && (
                <div className="sm:grid sm:grid-cols-3 md:gap-5 lg:gap-10 px-5 sm:px-10 pb-5 sm:pb-10 text-center">
                    <div className="flex sm:block border-y sm:border-0 border-black">
                        <div className="px-5 py-2 sm:p-2 sm:border-y border-black">
                            今日
                        </div>
                        <div className="m-auto py-2 sm:py-5 text-lg">
                            <TimeFormatter time={today_time} />
                        </div>                    
                    </div>
                    <div className="flex sm:block">
                        <div className="px-5 py-2 sm:p-2 sm:border-y border-black">
                            今月
                        </div>
                        <div className="m-auto py-2 sm:py-5 text-lg">
                            <TimeFormatter time={month_time} />
                        </div>                    
                    </div>
                    <div className="flex sm:block border-y sm:border-0 border-black">
                        <div className="px-5 py-2 sm:p-2 sm:border-y border-black">
                            累計
                        </div>
                        <div className="m-auto py-2 sm:py-5 text-lg">
                            <TimeFormatter time={total_time} />
                        </div>                    
                    </div>
                </div>
            )}
            <div className="text-center">タイムライン</div>
            <div className="border-y border-gray-500 overflow-y-auto max-h-[1000px]">
                {study_records.map((study_record) => { return (
                    <Link 
                        key={study_record.id}
                        href={route("study_record.show", study_record.id)}
                    >
                        <div className="px-3 py-5 bg-white border-y hover:bg-slate-50">
                            <div className="flex flex-wrap items-center text-sm font-bold">
                                {user ? (
                                    <UserIcon 
                                        user={user} 
                                        imgClassName="w-8 h-8"
                                        name={
                                            <div className="ml-3">{user.name}</div>
                                        }
                                    />
                                ) : (
                                    <UserIcon 
                                        user={study_record.user} 
                                        imgClassName="w-8 h-8"
                                        name={
                                            <div className="ml-3">{study_record.user.name}</div>
                                        }
                                    />
                                )}
                                <div className="mx-5">{study_record.date}</div>
                                <div className="hidden sm:flex px-2 py-1 bg-lime-200 text-black text-sm rounded-full">{study_record.category.name}</div>
                            </div>
                            <div className="flex sm:hidden mt-2 overflow-x-auto">
                                <div className="px-2 py-1 bg-lime-200 text-black text-sm font-bold rounded-full">{study_record.category.name}</div>
                            </div>
                            <div className="flex p-3 sm:px-10 md:px-20 lg:px-40 mt-3 font-bold border rounded-md">
                                <div className="flex-none pr-3 sm:pr-10 md:pr-20 lg:pr-40 m-auto">
                                    時間：<TimeFormatter time={study_record.time} />
                                </div>
                                <div className="flex-auto justify-self-center break-all line-clamp-2">
                                    {study_record.title}
                                </div>
                            </div>
                        </div>
                    </Link>
                ); })}                        
            </div>
        </div>
    );
}