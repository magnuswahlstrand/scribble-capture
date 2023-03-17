function checkForNewElement(selector, callback) {
    let elements = document.querySelectorAll(selector);
    let prevCount = elements.length;

    const observer = new MutationObserver((mutations) => {


        console.log('TICK')
        elements = document.querySelectorAll(selector);
        if (elements.length > prevCount) {
            console.log("REVEL")
            prevCount = elements.length;
            callback();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    return observer;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function captureCanvas() {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        console.log('NO CANVAS')
        if (!canvas) return;

        const a = document.createElement('a');
        a.href = url;
        a.download = generateRandomString(10) + '.png';
        a.style.display = 'none';
        console.log('DOWNLOADING')
        document.body.appendChild(a);
        console.log('CLICK')
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log('Remove')
        }, 100);
    });
}

console.log('STARTING')

const targetElementSelector = '.reveal.show'; // Replace with the selector of the element you want to track
checkForNewElement(targetElementSelector, captureCanvas);