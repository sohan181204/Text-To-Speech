window.addEventListener('DOMContentLoaded', (event) => {
    const textarea = document.querySelector('textarea');
    const voiceSelect = document.querySelector('select');
    const convertBtn = document.getElementById('convert_speech');
    const clearBtn = document.getElementById('clearBtn');

    // Initialize speech synthesis
    let voices = [];

    function populateVoiceList() {
        voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';

        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = index;
            voiceSelect.appendChild(option);
        });
    }

    // Populate voice options when the voices are loaded
    populateVoiceList();
    window.speechSynthesis.onvoiceschanged = populateVoiceList;

    // Convert text to speech
    convertBtn.addEventListener('click', () => {
        const text = textarea.value;
        if (text !== '') {
            const utterance = new SpeechSynthesisUtterance(text);
            const selectedVoice = voices[voiceSelect.value];
            utterance.voice = selectedVoice;
            window.speechSynthesis.speak(utterance);
            clearBtn.classList.remove('hide');
        }
    });

    // Clear the text area
    clearBtn.addEventListener('click', () => {
        textarea.value = '';
        clearBtn.classList.add('hide');
    });
});
