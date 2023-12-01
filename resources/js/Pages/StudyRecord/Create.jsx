import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, useState} from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create(props) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: props.auth.user.id,
        date: '',
        time: '',
        title: '',
        body: '',
        category_ids: [],
    });
    
    const handleOnChange = (event) => {
        if (event.target.name === 'category_ids') {
            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
            setData('category_ids', selectedOptions);
        } else {
            setData(event.target.name, event.target.value);
        }
    };
    
    const submit = (e) => {
        e.preventDefault();
        post(route('study_record.store'));
    };
    
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            StudyRecords
        </h2>
      }
    >
        <Head title="Study_records Create" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <InputError errors={errors} />
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="date" value="Date" />
                                
                                <TextInput
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={data.date}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                />
                                
                                <InputError message={errors.date} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="time" value="Time" />
                                
                                <TextInput
                                    id="time"
                                    type="number"
                                    name="time"
                                    value={data.time}
                                    className="mt-1 block w-full"
                                    onChange={handleOnChange}
                                />
                                
                                <InputError message={errors.time} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="title" value="title" />
                                
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    onChange={handleOnChange}
                                />
                                
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="body" value="Body" />
                                
                                <TextInput
                                    id="body"
                                    type="text"
                                    name="body"
                                    value={data.body}
                                    className="mt-1 block w-full"
                                    onChange={handleOnChange}
                                />
                                
                                <InputError message={errors.body} className="mt-2" />
                            </div>
                            
                            <div className="mt-4">
                                <InputLabel htmlFor="category" value="Category" />
                                <select
                                    id="category"
                                    name="category_ids"
                                    value={data.category_ids}
                                    className="mt-1 block w-full"
                                    onChange={handleOnChange}
                                    multiple
                                >
                                    {props.categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            
                                <InputError message={errors.category} className="mt-2" />
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