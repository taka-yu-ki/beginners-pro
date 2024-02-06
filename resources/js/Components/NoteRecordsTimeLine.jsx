import { Link } from "@inertiajs/react";
import UserIcon from "@/Components/UserIcon";

export default function NoteRecordsTimeLine({note_records, user}) {
    return (
        <div className="w-5/6 px-2 py-10 m-auto bg-gray-200 rounded-lg">
            <div className="text-center">タイムライン</div>
            <div className="border-y border-gray-500 overflow-y-auto max-h-[1000px]">
                {note_records.map((note_record) => { return (
                    <Link 
                        key={note_record.id} 
                        href={route("note_record.show", note_record.id)}
                    >
                        <div className="px-3 py-5 bg-white border-y hover:bg-slate-50">
                            <div className="flex items-center text-sm font-bold">
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
                                        user={note_record.user} 
                                        imgClassName="w-8 h-8"
                                        name={
                                            <div className="ml-3">{note_record.user.name}</div>
                                        }
                                    />
                                )}
                                <div className="ml-5">{note_record.date}</div>
                                <div className="flex">{note_record.categories.map((category) => <div className="px-2 py-1 ml-5 bg-lime-200 text-black text-sm rounded-full">{category.name}</div>)}</div>
                            </div>
                            <div className="p-3 mt-3 flex justify-center font-bold text-center border rounded-md">
                                {note_record.title}
                            </div>
                        </div>
                    </Link>
                ); })}
            </div>
        </div>
    );
}
