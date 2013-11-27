REM 不要なプラグインのtype文をREMでコメントアウト後、本BATを起動してください
REM
REM 例）jquery.ex-scrollが不要な場合
REM     REM type ex-scroll/jquery.ex-scroll.js >> jquery.utility-kit.js

type nul > jquery.utility-kit.js


REM jquery.ex-scroll
type ex-scroll\jquery.ex-scroll.js >> jquery.utility-kit.js

REM jquery.parse-url
type parse-url\jquery.parse-url.js >> jquery.utility-kit.js

REM jquery.keyinfo
type keyinfo\jquery.keyinfo.js >> jquery.utility-kit.js

REM jquery.bookmarklet
type bookmarklet\jquery.bookmarklet.js >> jquery.utility-kit.js
