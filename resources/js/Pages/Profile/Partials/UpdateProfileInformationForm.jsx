import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        image: "",
        text: user.text,
        goal_text: user.goal_text,
        goal_time: user.goal_time,
    });

    const imagePreview = (e) => {
        if (e.target.files.length > 0) {
            let src = URL.createObjectURL(e.target.files[0]);
            document.getElementById('preview').src = src;
            setData('image', e.target.files[0]);
        }
    }
    
    const submit = (e) => {
        e.preventDefault();
        
        post(
            route('profile.update'),
            {
                _method: 'PATCH',
                ...data,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel>プロフィール画像</InputLabel>
                    <div className="flex items-center">
                        <div className="relative w-16 h-16 overflow-hidden rounded-full bg-gray-200 mr-3">
                            <img
                                id="preview"
                                class="absolute inset-0 w-full h-full object-cover rounded-full"
                                src={user.image_url ? user.image_url : '/images/user_icon.png'}
                                alt=""
                            />
                        </div>
                        <InputLabel
                            htmlFor="image"
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            画像を選択
                        </InputLabel>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={imagePreview}
                            className="hidden"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.image} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                

                <div>
                    <InputLabel htmlFor="text" value="自己紹介文" />

                    <TextInput
                        id="text"
                        className="mt-1 block w-full"
                        value={data.text}
                        onChange={(e) => setData('text', e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.text} />
                </div>
                <div>
                    <InputLabel htmlFor="goal_text" value="目標" />

                    <TextInput
                        id="goal_text"
                        className="mt-1 block w-full"
                        value={data.goal_text}
                        onChange={(e) => setData('goal_text', e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.goal_text} />
                </div>

                <div>
                    <InputLabel htmlFor="goal_time" value="目標時間" />

                    <TextInput
                        id="goal_time"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.goal_time}
                        onChange={(e) => setData('goal_time', e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.goal_time} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}