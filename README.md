# Begginers-pro

<img width="1440" alt="ホーム画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/158c7919-758d-4ba7-851d-2e048e8bb3de">

---

## 概要

プログラミング初学者向けの学習時間記録アプリケーション。  

**目的：** 自身の学習進捗を可視化し、学習の方針を見直す手助けにする  
**制作期間：** 2023年11月〜2024年1月

## 制作の動機

プログラミング初学者にとって大事とされる言語の理解度。現代において、プログラミングは必須のスキルになりつつも、トレンドの変化やバージョンの更新などによって学習手順が不透明であり、学習の難易度が高まっている。  
特定のプログラミング言語の理解度は非常に重要であるが、どの言語のどのバージョンを学ぶのか、学習するにつれて学ぶべき言語が増えるのか、その全ての選択肢を把握することは容易ではない。また、並行した学習においてその進捗や内容を把握する手段の不足、それに伴うモチベーションの低下などが生じる傾向があった。  
こうした課題を解決するために、自身の学習を効果的に管理でき、同時にモチベーションを維持できるアプリケーションの制作に至った。

## 技術スタック

- Laravel 9.52.16
- React 18.2.0
- Inertia 0.6.11
- Heroku
- Heroku PostgreSQL 15.5
- GitHub
- Cloudinary

## アーキテクチャ

## 機能

### 主な機能

- 学習時間や学習内容のCRUD機能
<img width="1440" alt="学習記録一覧画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/cf6be26f-ab5e-4d18-8c37-886db588e903">  

---

- 学習時間をグラフとして表示する機能
<img width="1440" alt="グラフ機能画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/d6e34425-9ec9-4ffc-8800-59353c9274b5">
    
---

- 学習内容をより具体的に書くリッチテキストエディタ機能
<img width="1440" alt="リッチテキストエディタ画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/3539fa07-4be0-4d1d-8acb-a6cdb39d25e7">

---

- カテゴリー（言語）の追加・編集・削除機能
<img width="1440" alt="カテゴリー一覧画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/43b79e57-89a8-4b70-b770-d231ac2961e4">
    
---  

- プロフィール編集機能
<img width="1440" alt="プロフィール情報画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/9139de40-1d17-47dd-8959-c66f74f993f8">

---

### 付属する機能
- いいね機能
<img width="1198" alt="投稿いいね画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/d30f4bd2-785e-4c63-8658-8920e558d7b0">

---

- コメント機能
<img width="1440" alt="コメント画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/1e60b4b3-515d-4f41-ab1c-88d77419b3c0">

---

- フォロー機能
<img width="1440" alt="フォロー完了画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/61120a4c-7266-463f-9fe0-ad934d7e4051">

---

- 認証機能（Laravel Breeze）
<img width="1440" alt="登録画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/d23cb94c-848e-44ca-a58e-eecc5a009e9c">

---

- ユーザーアイコン追加・削除機能
<img width="607" alt="プロフィール画像登録画面" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/38046d2f-26b0-48d5-945e-dfbf66b6deda">

---

- グラフデータのページネーション機能
<img width="591" alt="グラフ機能画面のページネーション" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/f78d5c0d-8625-47c4-bd04-23e1311a24d6">

---

- カスタムエラーメッセージ機能
  
↓ バリデーションエラー
  
<img width="1203" alt="エラーメッセージ（バリデーションメッセージ）" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/b7320177-b3c6-4e84-86af-38cf5d8263b9">
  
↓ 例外処理
  
<img width="1440" alt="エラーメッセージ（flash）" src="https://github.com/taka-yu-ki/beginners-pro/assets/127290611/a6eca931-eb77-4980-a0ef-f5e0617f09ca">

---

## 工夫した点

- グラフ機能用のデータ作成
  
    Reactのrechartsライブラリを使用し、グラフ機能へ送信するデータの加工を工夫した。週の学習時間の表示（棒グラフ）、目標時間に対する進行率の表示（棒グラフ）、カテゴリーにおける学習時間の割合（円グラフ）の3つのグラフを作成し、Laravelのコントローラーでそれぞれのデータを加工した。特に週の学習時間用のデータは、日付ごとのオブジェクトを用意し、各日付にデータが存在したらオブジェクトにデータを入れ、それを週ごとにページネーションするように加工した。
  
- リッチテキストエディタの初期値
  
    Reactのlexicalライブラリを使用し、リッチテキストエディタ機能の初期値を工夫した。データの統一性と可読性を考慮し、JSON型でデータを受け渡す方法を選択した。ただし、テキストが入力されていない状態でもJSON型のデータが存在しており、これに対処するためにisEmptyを用いて空状態をbooleanで取得し、テキストが入力されていない場合には空文字を返すようにした。

- プロフィールの画像保存方法
  
    Laravel Breezeでのプロフィール機能にユーザーアイコンの追加・削除機能を実装した。その際、PUTCHメソッドではうまく動作せず、inertiaのドキュメントを調べたところ、「PUT、PATCH、またはDELETEのHTTPメソッドを使用している場合に、multipart/form-dataリクエストを使ったファイルのアップロードがネイティブにサポートされていないことがあります。」と書いてあったため、POSTメソッドに_method属性としてPATCHを指定することでファイルのアップロードを可能にした。

- エラーメッセージのカスタム
  
    標準のエラーメッセージは英語表記であるため、日本語表記に変更し、ステータスコードによるエラーページやエラーメッセージをカスタムした。

- レスポンシブデザイン
  
    ブラウザのサイズが320px~1536pxに対応するようにcssを設定した。

## 今後追加したい機能

- 無限スクロール機能
- カテゴリーの共通化（タグ化）
- セキュリティ対策
- アカウント作成時のメール認証機能
- 投稿の検索機能
- ダイレクトメッセージ機能

