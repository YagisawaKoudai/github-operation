# github-operation
このリポジトリは、githubAPIを用いて様々な操作を自動で行うための、
ローカル環境で実行する用のnodeプログラムです。

## 機能
- 自動マージ

## 機能詳細
各機能、以下を前提とします。
- githubのアクセストークンが`BUNDLE_GITHUB_TOKEN`という環境変数に設定されていること。
    - ない場合は、こちらを[参照](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)。
- 17系のnodejsの実行環境があること
    - ない場合は、インストールしてください。

### 自動マージ
#### 機能説明
本機能は、マージしたいPRのスプリントとURLリンクを所定のymlファイルに記載することで、
コマンド1つで、マージしてよいPRかどうかを判定し、問題なければマージまでしてくれる機能です。
マージしてよいかどうかの判定は、具体的には以下を実施します。
- PRに該当スプリントのラベルが付与されているかどうか
- PRにReviewPassのラベルが付与されているかどうか
- PRのベースブランチにあったラベルが付与されているかどうか
- PRのコミットメッセージが規則に則ったものであるかどうか
#### 使い方
1. `cd /your/path/github-operation`を実行し、本リポジトリの直下ディレクトリに移動する（/your/pathの部分は適宜修正）
2. `cp merge_pull_requests/pull_requests.sample.yml merge_pull_requests/pull_requests.yml`を実行する
3. `merge_pull_requests/pull_requests.yml`に、以下の情報を入力する
    - マージしたいPRのスプリント用のPRラベルタイトル
    - マージしたいPRのリンク
4. `npm run merge_pr`を実行する

## 参考
- github api reference
    - https://docs.github.com/en/rest/reference
- octokit library
    - https://www.npmjs.com/package/@octokit/rest
    - https://octokit.github.io/rest.js/v18
