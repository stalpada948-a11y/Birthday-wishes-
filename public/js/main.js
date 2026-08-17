// --- ADMIN PAGE LOGIC ---
const adminForm = document.getElementById('adminForm');

if (adminForm) {
    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const payload = {
            adminPass: document.getElementById('adminPass').value,
            receiverName: document.getElementById('receiverName').value,
            senderName: document.getElementById('senderName').value,
            birthdayDate: document.getElementById('birthdayDate').value,
            letterText: document.getElementById('letterText').value,
            images: document.getElementById('imageUrl').value.split(',').map(img => img.trim()).filter(img => img !== "")
        };

        try {
            const response = await fetch('/api/admin/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                document.getElementById('resultContainer').classList.remove('hidden');
                document.getElementById('generatedLink').value = window.location.origin + result.link;
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            alert('Something went wrong!');
        }
    });
}

function copyLink() {
    const linkInput = document.getElementById('generatedLink');
    linkInput.select();
    document.execCommand('copy');
    alert("Link Copied! You can now share it.");
}

// --- WISH PAGE LOGIC ---
const loadWishData = async () => {
    // Extract ID from URL path (e.g., /w/xyz123)
    const pathParts = window.location.pathname.split('/');
    const wishId = pathParts[pathParts.length - 1];

    if (!wishId || wishId === 'w') return;

    try {
        const response = await fetch(`/api/wish/data/${wishId}`);
        const result = await response.json();

        if (result.success) {
            const data = result.data;
            document.getElementById('displayReceiver').innerText = `Specially for you, ${data.receiverName} 🎁`;
            document.getElementById('displayLetter').innerText = data.letterText;
            document.getElementById('displaySender').innerText = `- Made with ❤️ by ${data.senderName}`;

            // Switch from Loading to Intro Screen
            document.getElementById('loading').classList.replace('active', 'hidden');
            document.getElementById('introScreen').classList.replace('hidden', 'active');
        } else {
            document.getElementById('loading').innerHTML = "<h2>Oops! This surprise couldn't be found.</h2>";
        }
    } catch (error) {
        document.getElementById('loading').innerHTML = "<h2>Server Error. Please try again.</h2>";
    }
};

const openSurpriseBtn = document.getElementById('openSurpriseBtn');
if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', () => {
        document.getElementById('introScreen').classList.replace('active', 'hidden');
        document.getElementById('mainWishScreen').classList.replace('hidden', 'active');
        // You can trigger Confetti/Music here if added
    });
}

// Auto-run if on the wish page
if (window.location.pathname.startsWith('/w/')) {
    loadWishData();
}

