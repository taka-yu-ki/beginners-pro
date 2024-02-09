import { Link } from "@inertiajs/react";

export default function ErrorPage({ status }) {
    const title = {
        503: "503 | サービス利用ができません",
        404: "404 | ページが見つかりません",
        403: "403 | アクセスが禁止されています",
        401: "401 | 認証エラー",
    }[status];

    const description = {
        503: "申し訳ありませんが、現在メンテナンス中です。しばらくしてから再度お試しください。",
        404: "申し訳ありませんが、お探しのページが見つかりませんでした。",
        403: "申し訳ありませんが、このページへのアクセスは禁止されています。",
        401: "認証エラーが発生しました。ログインしていないか、アクセス権がありません。",
    }[status];

    return (
        <div className="min-h-screen flex justify-center items-center text-center bg-gray-100">
            <div>
                <div className="text-5xl font-bold">{title}</div>
                <div className="pt-10">{description}</div>
                <div className="pt-10">
                    <Link href="/" className="underline text-gray-500 hover:text-gray-700">Topに戻る</Link>
                </div>
            </div>
        </div>
    );
}