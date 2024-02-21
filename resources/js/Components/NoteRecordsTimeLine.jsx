import { Link } from "@inertiajs/react";
import UserIcon from "@/Components/UserIcon";

export default function NoteRecordsTimeLine({note_records, user}) {
    return (
        <div className="sm:w-5/6 px-2 py-5 sm:py-10 m-auto bg-gray-200 sm:rounded-md">
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
                                        linkClassName="items-center"
                                        imgClassName="w-8 h-8"
                                        name={
                                            <div className="ml-3">{user.name}</div>
                                        }
                                    />
                                ) : (
                                    <UserIcon 
                                        user={note_record.user} 
                                        linkClassName="items-center"
                                        imgClassName="w-8 h-8"
                                        name={
                                            <div className="ml-3">{note_record.user.name}</div>
                                        }
                                    />
                                )}
                                <div className="mx-5">{note_record.date}</div>
                                <div className="hidden sm:flex overflow-x-auto">{note_record.categories.map((category) => <div className="px-2 py-1 mr-2 bg-lime-200 text-black text-sm rounded-full">{category.name}</div>)}</div>
                            </div>
                            <div className="flex sm:hidden mt-2 overflow-x-auto font-bold">
                                {note_record.categories.map((category) => 
                                    <div className="px-2 py-1 mr-2 bg-lime-200 text-black text-sm rounded-full">{category.name}</div>
                                )}
                            </div>
                            <div className="flex justify-center p-3 sm:px-10 md:px-20 lg:px-40 mt-3 font-bold border rounded-md">
                                <div className="break-all line-clamp-2">
                                    {note_record.title}
                                </div>
                            </div>
                        </div>
                    </Link>
                ); })}
            </div>
        </div>
    );
}
