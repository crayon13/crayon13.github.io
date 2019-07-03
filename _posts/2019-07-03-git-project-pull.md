---
layout: post
title: "git project 한방에 pull 받기"
category: tips
tags: 
    - git
    - tip
---
# 혹시 git source project를 N개 사용 하고 있고 한방에 pull 받고 싶다면.
```
#!/bin/sh
ARR_GIT_HOME_PATH=("/Users/crayon13/Workspace/");

for rootPath in ${ARR_GIT_HOME_PATH[@]}; do
    if [ "x${rootPath}" != "x" -a -d ${rootPath} ];then
        echo "++++++++++++++++++++++++++++++++++++";
        echo "scan root path : ${rootPath}";

        for gitPath in `find ${rootPath} -type d -name '.git'`; do
            targetPath=`echo ${gitPath} | sed -e 's/.git$//g'`;

            echo "[SART] ${targetPath} pull";
            cd ${targetPath};

            git fetch origin;
            git pull;

            echo "[END] ${targetPath} pull";
            echo "--------------------------------";
        done
    fi
done;
```