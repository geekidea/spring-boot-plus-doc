#! /bin/shell

# Copyright 2019-2029 geekidea(https://github.com/geekidea)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

#======================================================================
# 先下载按照脚本，多次执行该脚本，会覆盖以下下载的文件
# 快速安装jdk/git/maven/redis/mysql
#
# author: geekidea
# date: 2019-8-29
#======================================================================

# 下载脚本
wget -O install-all.sh https://springboot.plus/bin/install-all.sh
wget -O install-jdk.sh  https://springboot.plus/bin/install-jdk.sh
wget -O install-git.sh  https://springboot.plus/bin/install-git.sh
wget -O install-maven.sh  https://springboot.plus/bin/install-maven.sh
wget -O install-redis.sh  https://springboot.plus/bin/install-redis.sh
wget -O install-mysql.sh  https://springboot.plus/bin/install-mysql.sh
wget -O mysql_spring_boot_plus.sql https://springboot.plus/db/mysql_spring_boot_plus.sql

# 执行安装所有
sh install-all.sh