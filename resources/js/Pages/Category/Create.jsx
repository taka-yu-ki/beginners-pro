import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm} from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create(props) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        color: "#000000",
    });
    
    const handleOnChange = (event) => {
            setData(event.target.name, event.target.value);
    };
    
    const submit = (e) => {
        e.preventDefault();
        post(route('category.store'));
    };
    
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Category Create
        </h2>
      }
    >
        <Head title="Category Create" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <InputError errors={errors} />
                        <form onSubmit={submit}>
                        
                            <div>
                                <InputLabel htmlFor="name" value="カテゴリー名" />
                                
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                />
                                
                                <InputError message={errors.date} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="color" value="カラー" />
                                
                                <TextInput
                                    id="color"
                                    type="color"
                                    name="color"
                                    value={data.color}
                                    className="mt-1 block w-1/5"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                />
                                
                                <InputError message={errors.date} className="mt-2" />
                            </div>
                            
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4" processing={processing}>
                                    作成
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>          
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  );
}