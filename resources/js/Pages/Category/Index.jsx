import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index(props) {
    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        destroy(route("category.destroy", id), {
            preserveScroll: true,
        });
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
                    {props.categories.map((category) => { return (
                        <div className="bg-lime-500 p-7 m-5 sm:rounded-lg items-center flex justify-between">
                            <div>{category.name}</div>
                            <button 
                                className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                                onClick={() => handleDelete(category.id)}
                            >
                                削除
                            </button>
                        </div>
                    ); })}
            </div>
            </div>
        </AuthenticatedLayout>
    );
}