TemplateSynth
====
JavaScriptポリフォニックシンセサイザーのテンプレート

##Description
JavaScriptでポリフォニックシンセサイザーを作るときのテンプレートです。

ポリフォニック制御、鍵盤グラフィック、ASCIIキーボードインタフェース、MIDIインタフェース、WebMidiLinkインタフェース等が用意されているため、ボイス部のみ実装するだけで自作のシンセサイザーを作ることができます。

##How To Use
js/voice.jsを参考に以下のメソッドを実装してください。

| メソッド名 | 処理内容 |
|:---------:|:---------:|
|Voice#noteOn(note, velocity)|発音開始|
|Voice#changeNotet(note)|発音中に音程変更|
|Voice#noteOff()|発音終了|
|Voice#setParam(param_id, val)|パラメータ設定|

デフォルトではサイン波を生成するようになっています。
js/voice_sampler.jsはプレイバックサンプラーのvoice、js/voice_saw.jsはノコギリ波を重ねたvoiceの実装例です。


##Demo Page
http://aikelab.net/templatesynth/  
http://aikelab.net/templatesynth/sampler.html  
http://aikelab.net/templatesynth/sawsynth.html

##Credit
TemplateSynth is licenced under MIT License. Copyright 2014, aike (@aike1000)  
UIに[g200kg/web-audio-controls](https://github.com/g200kg/webaudio-controls)を使用しています。
