// Terminal typing effect
function initTerminalTyping() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    const commands = [
        'whoami',
        'Ishwar Lal Khatri',
        'nmap -sV -sC target.com',
        'Scanning for services...'
    ];
    
    let currentIndex = 0;
    
    function typeNextLine() {
        if (currentIndex < commands.length) {
            const line = document.createElement('p');
            if (currentIndex % 2 === 0) {
                // Command line
                const prompt = document.createElement('span');
                prompt.className = 'prompt';
                prompt.textContent = '0xSecIshOps@portfolio:~$ ';
                line.appendChild(prompt);
                line.appendChild(document.createTextNode(commands[currentIndex]));
            } else {
                // Output line
                line.textContent = commands[currentIndex];
                line.style.color = '#00ff88';
            }
            
            // Remove the cursor from previous line
            const cursor = terminalBody.querySelector('.cursor');
            if (cursor && cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
            }
            
            terminalBody.insertBefore(line, terminalBody.lastElementChild);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            currentIndex++;
            
            // Add cursor to new line
            const newLine = document.createElement('p');
            const newPrompt = document.createElement('span');
            newPrompt.className = 'prompt';
            newPrompt.textContent = '0xSecIshOps@portfolio:~$ ';
           
            
            const newCursor = document.createElement('span');
            newCursor.className = 'cursor';
            newCursor.textContent = '|';
            newLine.appendChild(newCursor);
            
            terminalBody.appendChild(newLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            setTimeout(typeNextLine, 1000);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeNextLine, 2000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTerminalTyping);