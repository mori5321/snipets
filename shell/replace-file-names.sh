for name in ./*; do mv ${name} ${name/hoge/fuga}; done

# Usage
# 
# > ls
# hoge1.txt hoge2.txt hoge3.txt
# 
# > for name in ./*; do mv ${name} ${name/hoge/fuga}; done
# > ls
# fuga1.txt fuga2.txt fuga3.txt
# 
