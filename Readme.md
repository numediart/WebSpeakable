# WebSpeakable

## Wait... What is it?
WebSpeakable is a Tampermonkey script for Chrome or Firefox that speaks the selected text on web pages using OS installed voices, or Google voices on Chrome web browser.  To use it, first select any text on the page (except inside an iframe) and press 'p' key.
It is also possible to declare some part of the HTML code, including inside iframe, to be "speakable" when there is mouse interaction (click or mouse hover).

## Running the demo
- Install [Tampermonkey](https://www.tampermonkey.net/) add-on on [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Firefox](https://addons.mozilla.org/fr/firefox/addon/tampermonkey/)
- Demo script can be installed by clicking [here](https://raw.githubusercontent.com/numediart/WebSpeakable/master/WebSpeakable_demo.user.js). It is set to speak with the first voice identified on your computer.
- Go to the [french Wikipedia Speech Synthesis web page](https://fr.wikipedia.org/wiki/Synth%C3%A8se_vocale) which is the targer for this script
- You should see an alert box telling you that the script is running (if not, see Troubleshooting section below), click OK
- When your mouse cursor becomes a headset ![headset](icons/speakable-on-click.ico), click to speak the text underneath
- On links, the cursor becomes a hand with headset ![hand with headset](icons/speakable-on-hover.ico). Just hover for half a second and the text will be spoken

## Customize to fit your web page


## Troubleshooting

## TODO List
- [ ] Access HTML elements by id
- [ ] Links inside a paragraph are not excluded from the speakables


## License
Copyright (c) 2019 [UMONS](https://web.umons.ac.be/en/) - [numediart](https://web.umons.ac.be/numediart/fr/accueil/) - [CLICK'](http://www.clicklivinglab.org/)
 
WebSpeakable is licensed under the Apache License, Version 2.0 (the "License");

you may not use this file except in compliance with the License.
You should have received a copy of the Apache License Version 2.0 along with this program.  If not, see

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


## Legal Notices
This work was produced as part of the FEDER Digistorm project, co-financed by the European Union and the Wallonia Region.

![Logo FEDER-FSE](https://www.enmieux.be/sites/all/themes/enmieux_theme/img/logo-feder-fse.png)