import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index(props) {
    const { delete: destroy } = useForm();
    
    const handleDelete = (id) => {
        const shouldDelete = window.confirm("カテゴリーの投稿は全て削除されます。本当によろしいですか。");
        
        if (shouldDelete) {
            destroy(route("category.destroy", id));
        } 
    };
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800">
                        カテゴリー 一覧
                    </div>
                    <Link href={route("category.create")}>
                        <PrimaryButton type="button">新規作成</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Category Index" />
            <div className="py-20">
                <div className="w-5/6 px-2 py-10 m-auto bg-gray-200 rounded-lg">
                    <div className="text-center">一覧</div>
                    <div className="border-y border-gray-500 overflow-y-auto max-h-[500px]">
                        {props.categories.map((category) => { return (
                            <div 
                                key={category.id}
                                className={`flex justify-between px-5 py-10 border border-gray-300`}
                                style={{ backgroundColor: category.color }}
                            >
                                <div className="flex-auto text-center text-2xl text-gray-700 font-semibold">{category.name}</div>
                                <div>
                                    <Link href={route("category.edit", category.id)}>
                                        <button className="px-4 py-2 ml-5 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600">
                                            編集
                                        </button>
                                    </Link>
                                    <button 
                                        className="px-4 py-2 ml-5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        削除
                                    </button>
                                </div>
                            </div>
                        ); })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}