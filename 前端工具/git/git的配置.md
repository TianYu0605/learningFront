### `git的最小配置`

### `配置user信息`
作用：当你做相关提交时，会发邮件给你
```bash
$ git config --global user.name 'your_name'
$ git config --global user.email 'your_email@domain.com'
```

### `config的三个作用域`
缺省相当于默认global
```bash
$ git config --local  #local只对某个仓库有效
$ git config --global  #global对当前用户所有仓库有效
$ git config --system  #system对系统所有登陆的用户有效
```

### `显示config的配置`
加 --list可显示配置,只输入 git config --list 会显示所有的配置
```bash
$ git config --list --local
$ git config --list --global
$ git config --list --system
```

### `global的作用`

### `创建git仓库`
* 把已有项目代码纳入git管理
```bash
$ cd 项目代码所在的文件夹
$ git init
```
* 新建的项目直接用git管理
```bash
$ cd 某个文件夹
$ git init your_project
$ cd your_project
```

### `对文件进行重命名`
```bash
$ mv index.html idea.html  #重命名文件
$ git add idea.html #将idea.html添加到暂存区
$ git rm index.html #将暂存区中的index.html移除
$ git mv index.html idea.html #可代替以上三个命令
```

### `常用命令`
```bash
$ vi index.html #查看index.html文件
$ lg -al #查看历史
```
