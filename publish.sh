#!/bin/sh

cd $(dirname $0)

ssh michael@econosim.org rm -frv /www/econosim.org/econosim.org/static

scp -r build/* michael@econosim.org:/www/econosim.org/econosim.org
