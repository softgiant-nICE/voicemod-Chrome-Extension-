# Company
https://voicemod.notion.site/voicemod/chrome-extension-definition-300931a344c94c1ea7e062ee29a29747


# Description
Chrome extension that connects to Text to Speechweb services to provide users with a Speech to Text to translate to Speech service.

## Actual POC features
We actually have a POC chrome extension that has this functionality:

When user push keybind it: 
1-Mutes mic
2-Launch a notification “Recording”
3-Records audio

When user release keybind it
1-It stop muting the mic
2-Launch a notification “Processing”
3-Sends to our webservice the recorded audio that answers with a 

Voice converted audio ( we do Speech to text to Speech in another voice in server side)
When audio is received from API response Chrome Extension sends the audio  through a virtual MIC chanel in the browser. It is launched in the audio channel so every attendant in a hangouts web conference listen to the audio.

## Final MVP definition

The chrome extension records audios, make speech to text and translation internally with wasm libraries, call APIs and launch the received audios through a virtual mic in the browser.

It will involve:

4 screens:

Info: Explains the chrome extension

Config: Define the params for the voice

Keybind definition: defines the keybinds 

Legal: Explay legal stuff

1 message popup

It will be informing the user on the background processes

2 API calls:

1-Get_Audio- 

sends: text to be readed, id of the voice to read it, language of the text

receives: audio reading the sent text

2-Get_voices- 

sends: text with voice name

receives: list of voices with ids

2  local WASM libraries-

1-Speech to text: Will transform audio to text locally

2-Translate: Will translate text

Local variable storage

1- Preferences 

Keybind A

Keybind b

Name and id of selected voice

Selected target language

2-List of last 5 voices used

3-Config file
