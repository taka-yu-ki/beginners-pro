import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index(props) {
    
    const { delete: destroy } = useForm();
    
    const handleDelete = async (id) => {
        const alart = window.confirm("カテゴリーの投稿は全て削除されます。本当によろしいですか。");
        
        if (alart) {
            await destroy(route("category.destroy", id));
        } 
    };
    
    return (
        <AuthenticatedLayout
          auth={props.auth}
          errors={props.errors}
          header={
            <div>
                <Link href={route("category.create")}>
                    <PrimaryButton type="button">新規作成</PrimaryButton>
                </Link>
            </div>
          }
        >
            <Head title="Category Index" />
            <div className="py-20">
                <div className="w-5/6 m-auto p-10 bg-slate-50 rounded-lg">
                    <div className="text-center">カテゴリー一覧</div>
                    {props.categories.map((category) => { return (
                        <div className="bg-lime-500 p-7 m-5 rounded-lg items-center flex justify-between">
                            <div>{category.name}</div>
                            <div>
                                <Link href={route('category.edit', category.id)}>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold mr-3">
                                        編集
                                    </button>
                                </Link>
                                <button 
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    ); })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}