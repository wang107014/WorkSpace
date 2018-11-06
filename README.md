##git流程
1. 将本地仓库初始化，命令：git init
2. 将项目从github或者服务器上克隆下来，命令：git clone url
3. 未修改项目前，查看项目状态，命令：git status
4. 查看当前状态，必须进入到项目文件中，而不是本地仓库中。命令：cd 文件夹  git status
5. 将文件修改提交到本地暂存区，命令：git add file，file 为修改文件名
6. 提交当前工作空间的修改内容，命令：git commit -m“修改”，
7. 将项目更新到github或服务器，命令：git push
8. 如果下次还要更新项目，直接git pull即可
9. 查看历史日志：命令：git log   (id 为commit后面的id)
10. 返回特定版本 命令：git reset id。id为返回的特定版本号