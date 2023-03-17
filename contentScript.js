function checkForNewElement(selector, callback) {
    let elements = document.querySelectorAll(selector);
    let prevCount = elements.length;

    const observer = new MutationObserver((mutations) => {
        elements = document.querySelectorAll(selector);
        if (elements.length > prevCount) {
            console.log("UP")
            prevCount = elements.length;
            callback();
        } else if (elements.length < prevCount) {
            console.log("DOWN")
            prevCount = elements.length;
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    return observer;
}

function captureCanvas() {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        if (!canvas) return;

        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10);

        const word = document.querySelector('.word').textContent
        const a = document.createElement('a');
        a.href = url;
        a.download = `scribble-capture-${dateStr}-${word}.png`;
        a.style.display = 'none';
        console.log('DOWNLOADING')
        document.body.appendChild(a);
        console.log('CLICK')
        a.click();
        document.body.removeChild(a);
    });
}

console.log('STARTING')
const targetElementSelector = '.reveal.show'; // Replace with the selector of the element you want to track
checkForNewElement(targetElementSelector, captureCanvas);