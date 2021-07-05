### `常用命令`
```bash
$ git stash # 提交当前代码到暂存区
$ git pull origin master # 从远程的master分支拉取代码并覆盖本地代码
$ git stash pop  # 将暂存区的代码弹出
$ git branch -a # 查看所有分支
$ git branch test # 在本地新建test分支
$ git push origin test # 将新分支发布在github上
$  git push origin :test # 删除远端的分支test
$ git branch -d feature/test #当一个分支被推送并合并到远程分支后， -d 才会本地删除该分支。 如果一个分支还没有被推送或者合并，那么可以使用 -D 强制删除它
$ git checkout feature/pre # 本地切换到feature/pre分支
$ git checkout -b feature/pre # 本地创建feature/pre分支并切换到feature/pre分支 相当于git branch feature/pre 和 git checkout feature/pre的集合
$ git checkout -b feature/pre origin # 本地创建feature/pre分支并关联
```

### `合并远程分支`
```bash
# 查询当前远程的版本
$ git remote -v
# 获取最新代码到本地(本地当前分支为[branch]，获取的远端的分支为[origin/branch])
$ git fetch origin master  #[示例1：获取远端的origin/master分支]
$ git fetch origin dev #[示例2：获取远端的origin/dev分支]
# 查看版本差异
$ git log -p master..origin/master #[示例1：查看本地master与远端origin/master的版本差异]
$ git log -p dev..origin/dev   #[示例2：查看本地dev与远端origin/dev的版本差异]
# 合并最新代码到本地分支
$ git merge origin/master  #[示例1：合并远端分支origin/master到当前分支]
$ git merge origin/dev #[示例2：合并远端分支origin/dev到当前分支]
```

### `git push出错`
报错：! [rejected] dev -> dev (non-fast-forward) <br>
处理：
```bash
$ git fetch origin dev #获取远程dev分支的修改
$ git merge origin dev #合并远程dev分支
$ git pull origin dev  #更新本地的代码
```

### `处理冲突：commit your changes or stash them before you can merge`
```bash
#方法一
$ git stash
$ git pull
$ git stash pop
#方法二：直接完全覆盖本地修改
$ git reset --hard
$ git pull
```

### `git提交代码时每次都要输入用户名和密码`
* 关闭弹窗并配置账户缓存
```bash
#关闭弹窗
$ git config --system --unset credential.helper 或 git config --global --unset credential.helper  
$ git config --global --unset credential.helper #如果上述命令执行后不起作用，再执行该命令
#缓存账号密码，第一次输入过后，账号和密码会被缓存到.git-credentials文件中
$ git config --global credential.helper store
```
参考文档：[github每次提交都要弹出登陆框，要求输入账号和密码](https://www.jianshu.com/p/912fe8c95908)
* 放弃使用http协议，使用ssh协议
```bash
#方法一：改掉https链接协议
$ git remote rm origin      # 删除名为 `origin` 的远程库
$ git remote add origin git@github.com:你的用户名/你的仓库名.git
#方法二：不需要删掉远程库，直接修改本地的 .git/config 文件，把
url = https://github.com/你的用户名/你的仓库名.git 
#改成
url = git@github.com:你的用户名/你的仓库名.git
```
参考文档：[Git添加ssh](https://blog.csdn.net/StardustYu/article/details/89044704)