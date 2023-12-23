import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index(props) {
    return (
        <AuthenticatedLayout
          auth={props.auth}
          errors={props.errors}
          header={
            <div>
                <Link href={route("note_record.create")}>
                    <PrimaryButton type="button">新規作成</PrimaryButton>
                </Link>
            </div>
          }
        >
            <Head title="Note_records Index" />
            <div className="py-10">
                <div className="w-5/6 m-auto my-5 text-center">
                    <div className="p-3 bg-cyan-200 rounded-t-lg">目標</div>
                    <div className="p-5 bg-slate-50 rounded-b-lg">{props.auth.user.goal_text}</div>
                </div>
                <div className="w-5/6 m-auto my-5 text-center">
                    <div className="p-3 bg-cyan-200 rounded-t-lg">目標時間</div>
                    <div className="p-5 bg-slate-50 rounded-b-lg">{props.auth.user.goal_time}</div>
                </div>
            </div>
            <div className="py-20">
            <div className="w-5/6 m-auto p-10 bg-slate-50 rounded-lg">
                <div className="text-center">タイムライン</div>
                <div className="p-6 bg-white border-t border-gray-200 overflow-y-auto" style={{ maxHeight: '500px' }}>
                    {[...props.note_records].sort((a, b) => new Date(b.date) - new Date(a.date)).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).map((note_record) => { return (
                        <Link key={note_record.id} href={route("note_record.show", note_record.id)}>
                            <div className="bg-red-500 m-5 sm:rounded-lg">
                                <div className="flex place-items-center text-white text-sm font-bold pt-3 px-3">
                                    <Link href={route("user.show", note_record.user.id)}>
                                        <img
                                            className="relative w-8 h-8 rounded-full ring-2 ring-white"
                                            src={note_record.user.image_url ? note_record.user.image_url : '/images/user_icon.png'}
                                            alt=""
                                        />
                                    </Link>
                                    <div className="mx-2">{note_record.user.name}</div>
                                    <div className="mx-2">{note_record.date}</div>
                                    <div className="flex">{note_record.categories.map((category) => <div className="bg-lime-300 text-black rounded-full px-2 py-1 mx-2">{category.name}</div>)}</div>
                                </div>
                                <div className="pt-1 pb-5 flex justify-evenly">
                                    <div className="text-white text-lg font-bold text-center">{note_record.title}</div>
                                </div>
                            </div>
                        </Link>
                    ); })}
                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}