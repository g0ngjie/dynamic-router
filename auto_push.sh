#/bin/bash

# auto deploy
TIME=$(date "+%m-%d %H:%M:%S")
NAME=$(git config user.name)

autoDeploy() {
    br=$(git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3)
    git add .
    git commit -m "$br 分支提交 ${TIME} by $NAME"
    echo "当前分支 -------- $br $TIME"
    git pull origin $br
    git push origin $br
}

deploy() {
    git add .
    git commit -m "$1 分支提交 ${TIME} by $NAME"
    git pull origin $1
    git push origin $1
}

if [ x"$1" = x ]; then
    autoDeploy
    echo -e "\n ---> $TIME [$NAME] 提交成功\n"
else
    deploy $1
    echo -e "\n ---> $TIME [$NAME] $1分支 提交\n"
fi

