## 

```bash
$ git reset --hard #清除暂存区，但不会破坏commit的历史 
$ git log #查看当前分支操作日志
$ git log --all --graph #以图形化的方式查看所有分支的操作日志
$ git log -n4 --oneline #查看当前分支最近的四次操作，以一行显示，加--all 就是查看所有分支
$ git help --web log #在web端查看操作日志详情
$ git branch -v #查看本地分支
$ git checkout -b temp 222 #创建一个临时分支
$ git branch -av #查看所有分支
```


### `工作流常用git命令`
1.创建本地分支 develop（多人合作的分支 和远程develop代码保持同步） 和 feature-12852
在仓库创建项目，转到要上传的地方，打开git，输入  
git init
然后输入
git remote add origin

新建本地develop分支并切换到develop分支
git checkout -b develop

新建本地  feature-工号 分支并切换到该分支(比如feature-12852 接下来的说明都是用feature-12852 注意使用时替换成自己的)   
git checkout -b feature-25458  

查看有哪些分支：git branch 
2.在本地修改代码
在feature-12852 修改本地代码    

3.提交修改代码到远程 在feature-12852 下
git add .
//该语句将本地有变化的提交到暂存区                                             
git commit -m "你对自己修改的简单描述 几个字就行"
//该语句提交当前工作空间的修改内容     

git checkout develop  
//该语句切换到本地develop分支                               
git pull origin develop 
//该句将远程develop分支代码保存到本地develop                            

（如果pull的时候报冲突  需解决冲突再进行下一步）

git merge feature-12852 
//该语句将在feature-12852中的修改合并过来                                 

git push origin develop
//该语句将本地修改的代码推送到远程develop分支                              

4.提交结束后进行下一次的本地代码修改
提交完成之后 我们需要继续返回到feature-12852分支 去进行下一次的修改
git checkout feature-12852
git merge develop    
//该语句会将我们从远程得到的代码更新到本地

从远端仓库拉下
git clone +https地址
进入到拉下的文件夹中查看分支
git branch -a
创建个人分支
git checkout -b b-工号-编码 origin/b-12758
查看分支
git branch -a
接下来
git add .
git commit -m ""
git push -u origin b-25458-CRPREPAYMEN2

-g就是全局安装的意思