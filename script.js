class PromptCopy {
    constructor() {
        this.prompts = [];
        this.currentIndex = -1;
        this.container = document.getElementById('prompts-container');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.notification = document.getElementById('copy-notification');
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadPrompts();
            this.renderPrompts();
            this.setupEventListeners();
        } catch (error) {
            this.showError();
            console.error('Failed to initialize:', error);
        }
    }
    
    async loadPrompts() {
        try {
            const response = await fetch('prompts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.prompts = data.prompts || [];
            this.loading.style.display = 'none';
        } catch (error) {
            this.loading.style.display = 'none';
            throw error;
        }
    }
    
    renderPrompts() {
        if (this.prompts.length === 0) {
            this.container.innerHTML = '<div class="error">No prompts found in configuration file.</div>';
            return;
        }
        
        this.container.innerHTML = '';
        
        this.prompts.forEach((prompt, index) => {
            const promptCard = this.createPromptCard(prompt, index);
            this.container.appendChild(promptCard);
        });
    }
    
    createPromptCard(prompt, index) {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.setAttribute('data-index', index);
        
        card.innerHTML = `
            <div class="copy-icon">📋</div>
            <div class="prompt-title">${this.escapeHtml(prompt.title)}</div>
            <div class="prompt-text">${this.escapeHtml(prompt.text)}</div>
        `;
        
        return card;
    }
    
    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const promptCard = e.target.closest('.prompt-card');
            if (promptCard) {
                const index = parseInt(promptCard.getAttribute('data-index'));
                this.copyPrompt(index);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateToNext();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateToPrevious();
            } else if (e.key === 'Enter' && this.currentIndex >= 0) {
                e.preventDefault();
                this.copyPrompt(this.currentIndex);
            }
        });
    }
    
    async copyPrompt(index) {
        if (index < 0 || index >= this.prompts.length) return;
        
        const prompt = this.prompts[index];
        const promptCard = document.querySelector(`[data-index="${index}"]`);
        
        try {
            // Copy to clipboard
            await navigator.clipboard.writeText(prompt.text);
            
            // Visual feedback
            promptCard.classList.add('copying');
            this.showNotification();
            
            // Auto-scroll to next prompt
            setTimeout(() => {
                promptCard.classList.remove('copying');
                this.scrollToNext(index);
            }, 500);
            
            this.currentIndex = index;
            
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            // Fallback for older browsers
            this.fallbackCopy(prompt.text);
        }
    }
    
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification();
        } catch (error) {
            console.error('Fallback copy failed:', error);
        } finally {
            document.body.removeChild(textArea);
        }
    }
    
    scrollToNext(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.prompts.length;
        const nextCard = document.querySelector(`[data-index="${nextIndex}"]`);
        
        if (nextCard) {
            // Smooth scroll to next prompt using native browser scrolling
            nextCard.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight the next prompt briefly
            nextCard.classList.add('next-highlight');
            setTimeout(() => {
                nextCard.classList.remove('next-highlight');
            }, 1000);
        }
    }
    
    navigateToNext() {
        this.currentIndex = (this.currentIndex + 1) % this.prompts.length;
        this.highlightCurrent();
    }
    
    navigateToPrevious() {
        this.currentIndex = this.currentIndex <= 0 ? this.prompts.length - 1 : this.currentIndex - 1;
        this.highlightCurrent();
    }
    
    highlightCurrent() {
        // Remove previous highlights
        document.querySelectorAll('.prompt-card').forEach(card => {
            card.classList.remove('next-highlight');
        });
        
        // Highlight current
        const currentCard = document.querySelector(`[data-index="${this.currentIndex}"]`);
        if (currentCard) {
            currentCard.classList.add('next-highlight');
            currentCard.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            setTimeout(() => {
                currentCard.classList.remove('next-highlight');
            }, 1000);
        }
    }
    
    showNotification() {
        this.notification.classList.add('show');
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 2000);
    }
    
    showError() {
        this.loading.style.display = 'none';
        this.error.style.display = 'block';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PromptCopy();
});

// Service worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, but app can still work
        });
    });
}