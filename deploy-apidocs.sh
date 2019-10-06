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



cd /github/spring-boot-plus/target/apidocs/

echo "# spring-boot-plus Java Apidocs" > README.md
echo "## [http://geekidea.io/spring-boot-plus-apidocs](http://geekidea.io/spring-boot-plus-apidocs)" >> README.md
echo "## [https://springboot.plus](https://springboot.plus)" >> README.md

git init
git add .
git commit -m 'spring-boot-plus java apidocs'

git remote add origin git@github.com:geekidea/spring-boot-plus-apidocs.git

git push origin master -f

echo "deploy apidocs success"

cd ..