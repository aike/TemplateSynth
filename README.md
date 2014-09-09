TemplateSynth
====
JavaScriptポリフォニックシンセサイザーのテンプレート

##Description
JavaScriptでポリフォニックシンセサイザーを作るときのテンプレートです。

ポリフォニック制御、鍵盤グラフィック、ASCIIキーボードインタフェース、MIDIインタフェース、WebMidiLinkインタフェース等が用意されているため、ボイス部のみ実装するだけで自作のシンセサイザーを作ることができる。

##How To Use
js/voice.jsを参考に拡張してください。
デフォルトではサイン波を生成するようになっています。

js/voice_sampler.jsはプレイバックサンプラーのvoice実装例です。


##Credit
TemplateSynth is licenced under MIT License. Copyright 2014, aike (@aike1000)
UIに[g200kg/web-audio-controls](https://github.com/g200kg/webaudio-controls)を使用しています。
