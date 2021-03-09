### `常用命令`

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