// ==UserScript==
// @name           WebSpeakable
// @namespace      https://github.com/numediart/WebSpeakable
// @description    Speaks the selected text in installed Microsoft voice. To use it, first select any text on the page (except inside an iframe) and press 'p' key.
//                 It will automatically get the text and speak it. Please wait for a white until the complete speech is loaded in the background. For longer texts it may take a while.
//                 It is also possible to declare some part of the HTML code (including inside iframe) to be "speakable" by giving the classname hierachy of this text.
// @author         Fabien Grisard - Click - UMONS
// @license        http://www.apache.org/licenses/LICENSE-2.0
// @copyright      Copyright (c) 2019, UMONS
// @version	   	   0.1
// @include        https://fr.wikipedia.org/wiki/Synth%C3%A8se_vocale
// @updateURL      https://raw.githubusercontent.com/numediart/WebSpeakable/master/WebSpeakable_demo.user.js
// @downloadURL    https://raw.githubusercontent.com/numediart/WebSpeakable/master/WebSpeakable_demo.user.js
// ==/UserScript==

// Copyright (c) 2019, UMONS
// WebSpeakable is licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You should have received a copy of the Apache License Version 2.0 along with this program.
// If not, see http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.



var voiceIndex = 0;
////////// On Chrome web browser - Windows 10 /////////////
// [0] : Microsoft Hortense Desktop - French
// [1] : Microsoft Zira Desktop - English (United States)
// [2] : Google Deutsch
// [3] : Google US English
// [4] : Google UK English Female
// [5] : Google UK English Male
// [6] : Google español
// [7] : Google español de Estados Unidos
// [8] : Google français
// [9] : Google हिन्दी
// [10] : Google Bahasa Indonesia
// [11] : Google italiano
// [12] : Google 日本語
// [13] : Google 한국의
// [14] : Google Nederlands
// [15] : Google polski
// [16] : Google português do Brasil
// [17] : Google русский
// [18] : Google 普通话（中国大陆）
// [19] : Google 粤語（香港）
// [20] : Google 國語（臺灣）

// cursor found at https://www.cursor.cc/?action=icon&file_id=104487 under Creative Commons Licence
var cursorSpeakOnClick = 'data:image/x-icon;base64,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9f/39fX/AAAADwAAAAYAAAADAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39fX/QxgU2ff19f8AAAAA9/X1/1IdGf/39fX/AAAABQAAAAAAAAAAAAAAAPf19f/39fX/9/X1//f19f/39fX/9/X1//f19f/39fX/AAAACAAAAAYAAAADAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAD39fX/QxgU2vf19f8AAAAA9/X1/1IdGf/39fX/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAD39fX/QxgU1Pf19f8AAAAA9/X1//f19f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAD39fX/Uh0Z//f19f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////8D/8B+A//AfAP9QDgDuAAYAhgAAAAIAAAAAAAAAAAAAAAgAAgAGBAYArggHAf8IDwH/2B/B//g/w//8P8v//T+B//gfwf/4P8D/8D/gf+B/4B+AfzAAAP8YAAH8jAAD/EcAD/4jwD//Ef///4n////H///8=';
// cursor custom made
var cursorSpeakOnHover = 'data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AEj//wBI/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wBI//8ASO//+/wBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AEj//wBI//8ASP//AEj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AEj//wBI//8ASP//AEj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wBI//8ASP//AEj//wBI//8ASP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8ASP//AEj//wBI//8ASP//AEj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v7+/+sAQv//AEj//wBI//8ASP//AEj//wBI//7+/v/+/v7//v7+//7+/v8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wBI//8ASP//AEj//wBI//8ASP//AEj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v7//wBI//8ASP//AEj//wBI//8ASP//AEj//v7+//7+/v/+/v7//v7+/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AEj//wBI//8ASP//AEj//wBI//8ASP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////3/AEj//wBI//8ASP//AEj//wBI//8ASP/+/v7//v7+//7+/v/+/v7/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8ASP//AEj//wBI//8ASP//AEj//wBI/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////f7+/v//AEj//wBI//8ASP//AEj//wBI//7+/v/+/v7//v7+//7+/v8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wBI//8ASP//AEj//wBI//8ASP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAkJCfv////9/v7+//8ASP//AEj//wBI//8ASP//AEj//v7+//7+/v/+/v7//v7+/wkJCfsAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAD/AEj//wBI//8ASP//AEj//wBI/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v7+//7+/v/+/v7//v7+//8ASP//AEj//wBI//8ASP/+/v7//v7+//7+/v/+/v7//v7+/wAAAP8AAAD9AAAAAAAAAAAAAAAAAAAAAP8ASP//AEj//wBI//0AR/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v7//v7+//7+/v/+/v7//v7+//8ASP//AEj//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+/wAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAP8ASP//AEj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v7+//7+/v/+/v7//v7+//7+/v/+/v7//wBI//8ASP/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7/AAAA/QAAAAAAAAAAAAAAAAAAAAAAAAAA/wBI//8ASP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v7//v7+//7+/v/+/v7//v7+//7+/v//AEj//wBI//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/7+/v+AAAA/wAAAAAAAAAAAAAAAAAAAAD/AEj//wBI/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAALAAAA/P7+/v/+/v7//v7+//7+/v/+/v7//v7+//8ASP//AEj//wBI//7+/v/+/v7//v7+//7+/v/+/v7//v7+//v7+/4AAAD/AAAAAAAAAAAAAAAA/wBI//8ASP//AEj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//8ASP//AEj//v7+//7+/v/+/v7//v7+//7+/v/+/v7/+/v7/gAAAP8AAAAAAAAAAAAAAAD/AEj//wBI/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//wBI//8ASP//AEj//v7+//7+/v/+/v7//v7+//7+/v/7+/v+AAAA/wAAAAAAAAAA/wBI//8ASP//AEj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7+/v/+/v7//v7+/wAAAP/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//wBI//8ASP//AEj//wBI//7+/v/+/v7//v7+//v7+/4RAAT//wBI//8ASP//AEj//wBI/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgL+/v7+//7+/v/+/v7/AAAA//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//wBI//8ASP//AEj//wBI//8ASP//AEj//wBI//8ASP//AEj//wBI//8ASP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7+/v/+/v7//v7+//7+/v8AAAD//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//4CSv//AEj//wBI//8ASP//AEj//wBI//8ASP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v7+//7+/v/+/v7/AAAA/wAAAP/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7/8vLy+wAAAP/+/v7//v7+//v7+/4AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v7//v7+/wAAAP8AAAAAAAAA//7+/v/+/v7//v7+/wAAAP/+/v7//v7+//7+/v8AAAD//v7+//7+/v/y8vL7AAAA//7+/v/+/v7/+/v7/gAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAAAAAAD//v7+//7+/v/+/v7/AAAA//7+/v/+/v7//v7+/wAAAP/+/v7//v7+//Ly8vsAAAD//v7+//7+/v8AAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v7//v7+//7+/v8AAAD//v7+//7+/v/+/v7/AAAA//7+/v/+/v7/8vLy+wAAAP/+/v7/AAAA/wAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7+/v/+/v7//v7+/wAAAP/+/v7//v7+//7+/v8AAAD//v7+//7+/v/y8vL7AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v7+//7+/v/+/v7/AAAA//7+/v/+/v7//v7+/wAAAP8AAAD/AAAA/wAAAOoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v7//v7+//7+/v8AAAD/AAAA/wAAAP8AAAD/AAAAAgAAAAIAAAACAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7+/v/+/v7//v7+/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v7+//7+/v/+/v7/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v7//v7+//7+/v8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7+/v/+/v7//v7+/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v7+//7+/v/+/v7/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v7//v7+//7+/v8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//P/n//D/4f/g/+D/AAfgfwAH4H8AB+B/AAfg/wAH4P4AAeH+AAHz/AAB8/wAAPP8AADj8AAA5/AAAMfgAAAP4AAAH8AAAH/AAAD/wgAA/+IAAf/+AAH//gAH//4AH//+Af///g////4P///+D////g////4P///+D////x///8=';

// how long to hover on a clickable / speackable text before to speak it when speakOnClick is false
var mouseOverTimeout = 500;

// which key to press for speaking selected text
var speakKey = 'KeyP';


var speakables = [
    // article title
    { hierarchy:[{class:'firstHeading', id:0}],
      speakOnClick: true},
    // article texts
    { hierarchy:[{class:'mw-parser-output', id:0}, {tag:'p', id:-1}],
      speakOnClick: true,
      remove:/&nbsp;/g},
    // 'sommaire'
    { hierarchy:[{class:'toc', id:0}, {class:'toctitle', id:0}, {tag:'h2', id:0}],
      speakOnClick: true },
    // content levels and titles
    { hierarchy:[{class:'toc', id:0}, {class:'toctext', id:-1}],
      speakOnHover: true },
    { hierarchy:[{class:'toc', id:0}, {class:'tocnumber', id:-1}],
      speakOnHover: true },
    // all sections titles and subtitles
    { hierarchy:[{class:'mw-content-ltr', id:0}, {class:'mw-headline', id:-1}],
      speakOnClick: true }
];



var isChromium = window.chrome;
if(isChromium !== null &&
  typeof isChromium !== "undefined" &&
  window.navigator.vendor === "Google Inc.") {
    window.onload = init;
}
else {
    init();
}


function init() {
    speakables.forEach(makeArraySpeakable);
    document.addEventListener('keypress', keyPress, true);
    logVoices();

    // do not remove this, needed to avoid deprecation message :
    // [Deprecation] speechSynthesis.speak() without user activation is no longer allowed since M71
    alert('Text to speech script activated');
}


function makeArraySpeakable(item, index) {
    if(item.hierarchy != undefined) {
        makeElementsSpeakableByHierarchy(document, item, 0, -1);
    }
}


function makeElementsSpeakableByHierarchy(root, speakableItem, level, index) {
    var localLevel = level >= speakableItem.hierarchy.length - 1? speakableItem.hierarchy.length - 1: level;
    //console.log('[' + level + '] : { className = ' + speakableItem.hierarchy[localLevel].class + " or tag = " + speakableItem.hierarchy[localLevel].tag + ', ' + speakableItem.hierarchy[localLevel].id + '}, index is ' + index);
    if(speakableItem.hierarchy[localLevel].id >= 0 || index >= 0) {
        var element;
        if(level > speakableItem.hierarchy.length - 1) element = root;
        else {
            if(speakableItem.hierarchy[level].class != null)
               element = level > 0 && speakableItem.hierarchy[level-1].isIFrame == true?
                   root.contentWindow.document.getElementsByClassName(speakableItem.hierarchy[level].class)[speakableItem.hierarchy[level].id] :
                   root.getElementsByClassName(speakableItem.hierarchy[level].class)[speakableItem.hierarchy[level].id];
            else if(speakableItem.hierarchy[level].tag != null)
                element = level > 0 && speakableItem.hierarchy[level-1].isIFrame == true?
                    root.contentWindow.document.getElementsByTagName(speakableItem.hierarchy[level].tag)[speakableItem.hierarchy[level].id] :
                    root.getElementsByTagName(speakableItem.hierarchy[level].tag)[speakableItem.hierarchy[level].id];
        }

        if(level >= speakableItem.hierarchy.length - 1) {
            // make element speakable and return
            //console.log(element);
            var textToSpeak = element.innerHTML;
            if(speakableItem.remove != null) {
                textToSpeak = textToSpeak.replace(speakableItem.remove, ' ');
            }
            if(speakableItem.removeAfter != null) {
                textToSpeak = textToSpeak.substring(0, textToSpeak.indexOf(speakableItem.removeAfter));
            }

            if(speakableItem.speakOnClick == true) {
                element.style.cursor = "url('" + cursorSpeakOnClick + "'), auto";
                element.onclick = function() {
                    speakText(textToSpeak);
                }
            }
            else if(speakableItem.speakOnHover == true) {
                element.style.cursor = "url('" + cursorSpeakOnHover + "'), auto";
                var timeoutState;
                element.onmouseenter = function() { timeoutState = setTimeout(function() {
                    speakText(textToSpeak);
                }, mouseOverTimeout);}
                element.onmouseleave = function() { clearTimeout(timeoutState); }
            }
            return;
        }
        else {
            // go one step deeper
            makeElementsSpeakableByHierarchy(element, speakableItem, level+1, -1);
        }
    }
    else { // many elements
        var elements;
        if(speakableItem.hierarchy[level].class != null)
               elements = localLevel > 0 && speakableItem.hierarchy[localLevel-1].isIFrame == true?
                   root.contentWindow.document.getElementsByClassName(speakableItem.hierarchy[level].class) :
                   root.getElementsByClassName(speakableItem.hierarchy[level].class);
       else if(speakableItem.hierarchy[level].tag != null)
                elements = localLevel > 0 && speakableItem.hierarchy[localLevel-1].isIFrame == true?
                    root.contentWindow.document.getElementsByTagName(speakableItem.hierarchy[level].tag) :
                    root.getElementsByTagName(speakableItem.hierarchy[level].tag);

        var i = 0;
        for(i; i < elements.length; i++) {
            makeElementsSpeakableByHierarchy(elements[i], speakableItem, level+1, i);
        }
    }
}


function logVoices() {
    console.log('identifying voices');
    if ('speechSynthesis' in window) {
        var defaultVoice = "";
        speechSynthesis.getVoices().forEach(function(voice, index) {
            console.log('[' + index + '] : ' + voice.name);
            if(voice.default) { defaultVoice = voice.name; }
        });
        //console.log('default voice is ' + defaultVoice);
    }
    else {
        alert('Speech Synthesis not supported' +
              'Your browser does not support speech synthesis.' +
              'We recommend you use Google Chrome');
    }
}


function speakText(text) {
    if (!'speechSynthesis' in window) {
        alert('Speech Synthesis not supported' +
              'Your browser does not support speech synthesis.' +
              'We recommend you use Google Chrome');
        return;
    }
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[voiceIndex];
    msg.rate = 1;
    msg.pitch = 1;
    msg.text = text;
    msg.onend = function(e) {
        console.log('Finished in ' + e.elapsedTime / 1000.0 + ' seconds.');
    };
    console.log('speak : ' + text);
    speechSynthesis.speak(msg);
}


function cleanText(input) {
    var output = "";
	if(input.rangeCount > 0) {
		var i = 0;
		while(i < input.rangeCount) {
			output += input.getRangeAt(i++).toString().replace(/[\t \n\r]+/g,' ') + ' ';
        }
        output = output.replace(/&nbsp/g, ' ');
		return output;
	} else {
		return "";
    }
}


function getSelText() {
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    }
    return cleanText(txt);
}


function keyPress(e) {
    //console.log('key pressed : ' + e.code);
    var t = getSelText();
	if(e && e.code == speakKey) {
		if(t != undefined && t.length > 0) {
			speakText(t);
        }
	}
}
