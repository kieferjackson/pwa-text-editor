const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Track the triggered event
    window.deferredPrompt = event;

    event.preventDefault();
    butInstall.style.visibility = 'visible';
});

// Click event handler for the installer button element
butInstall.addEventListener('click', async (event) => {
    const prompt_event = window.deferredPrompt;

    if(!prompt_event)
        return;

    // Prompt the user and clear the prompt
    prompt_event.prompt();
    window.deferredPrompt = null;
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
});

// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear the prompt
    window.deferredPrompt = null;
    console.log('JATE was successfully installed: ', event)
});
