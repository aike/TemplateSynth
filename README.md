TemplateSynth
====
JavaScriptポリフォニックシンセサイザーのテンプレート

##Description
JavaScriptでポリフォニックシンセサイザーを作るときのテンプレートです。

ポリフォニック制御、鍵盤グラフィック、ASCIIキーボードインタフェース、MIDIインタフェース、WebMidiLinkインタフェース等が用意されているため、ボイス部のみ実装するだけで自作のシンセサイザーを作ることができます。

##How To Use
js/voice.jsを参考に拡張してください。
デフォルトではサイン波を生成するようになっています。
js/voice_sampler.jsはプレイバックサンプラーのvoice、js/voice_saw.jsはノコギリ波を重ねたvoiceの実装例です。

##Demo Page
http://aikelab.net/templatesynth/
http://aikelab.net/templatesynth/sampler.html
http://aikelab.net/templatesynth/sawsynth.html

##Credit
TemplateSynth is licenced under MIT License. Copyright 2014, aike (@aike1000)
UIに[g200kg/web-audio-controls](https://github.com/g200kg/webaudio-controls)を使用しています。
