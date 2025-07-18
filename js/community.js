function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
    // Render posts to #communityPosts
    const container = document.getElementById('communityPosts');
    if (!container) return;
    container.innerHTML = '';
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'community-post';
        div.textContent = post;
        container.appendChild(div);
    });
}
function addPost(post) {
    const posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
    posts.push(post);
    localStorage.setItem('communityPosts', JSON.stringify(posts));
    loadPosts();
}
window.loadPosts = loadPosts;
window.addPost = addPost;
// Community Forum System
class CommunityForum {
    constructor() {
        this.posts = [];
        this.currentUser = null;
        this.init();
    }

    init() {
        this.generateMockPosts();
        this.setupUser();
    }

    setupUser() {
        // Mock user data
        this.currentUser = {
            id: 1,
            name: 'Rajesh Kumar',
            nameHi: 'राजेश कुमार',
            location: 'Jodhpur, Rajasthan',
            locationHi: 'जोधपुर, राजस्थान',
            experience: '15 years',
            experienceHi: '15 साल',
            avatar: 'RK',
            crops: ['Pearl Millet', 'Chickpea', 'Mustard'],
            cropsHi: ['बाजरा', 'चना', 'सरसों']
        };
    }

    generateMockPosts() {
        const mockPosts = [
            {
                id: 1,
                author: 'Priya Sharma',
                authorHi: 'प्रिया शर्मा',
                avatar: 'PS',
                location: 'Bikaner, Rajasthan',
                locationHi: 'बीकानेर, राजस्थान',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                title: 'Pearl Millet Intercropping Success',
                titleHi: 'बाजरा अंतर-फसल सफलता',
                content: 'I successfully intercropped pearl millet with cowpea this season. The cowpea helped fix nitrogen in the soil and I got additional income from both crops. Water requirement was only 30% more than growing millet alone.',
                contentHi: 'मैंने इस सीजन में बाजरे के साथ लोबिया की अंतर-फसल सफलतापूर्वक ली। लोबिया ने मिट्टी में नाइट्रोजन स्थिर करने में मदद की और मुझे दोनों फसलों से अतिरिक्त आय मिली। पानी की आवश्यकता अकेले बाजरा उगाने से केवल 30% अधिक थी।',
                category: 'crop-tips',
                likes: 23,
                comments: 8,
                isLiked: false,
                tags: ['pearl-millet', 'intercropping', 'cowpea', 'water-saving']
            },
            {
                id: 2,
                author: 'Mukesh Patel',
                authorHi: 'मुकेश पटेल',
                avatar: 'MP',
                location: 'Kutch, Gujarat',
                locationHi: 'कच्छ, गुजरात',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                title: 'Drip Irrigation Installation Experience',
                titleHi: 'ड्रिप सिंचाई स्थापना अनुभव',
                content: 'Just completed my drip irrigation setup with government subsidy. The process took 2 months but worth it. My water usage reduced by 60% and crop yield increased by 25%. Happy to share details with anyone interested.',
                contentHi: 'सरकारी सब्सिडी के साथ मेरा ड्रिप सिंचाई सेटअप पूरा हुआ। प्रक्रिया में 2 महीने लगे लेकिन इसके लायक था। मेरा पानी का उपयोग 60% कम हो गया और फसल की उपज 25% बढ़ गई। इच्छुक किसी भी व्यक्ति के साथ विवरण साझा करने में खुश हूं।',
                category: 'irrigation',
                likes: 45,
                comments: 12,
                isLiked: true,
                tags: ['drip-irrigation', 'subsidy', 'water-conservation', 'yield-increase']
            },
            {
                id: 3,
                author: 'Sunita Devi',
                authorHi: 'सुनीता देवी',
                avatar: 'SD',
                location: 'Hanumangarh, Rajasthan',
                locationHi: 'हनुमानगढ़, राजस्थान',
                timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                title: 'Quinoa Farming in Desert - First Experience',
                titleHi: 'मरुस्थल में क्विनोआ खेती - पहला अनुभव',
                content: 'Started quinoa cultivation for the first time this rabi season. The crop adapted well to our arid conditions. Used 40% less water than wheat and got premium price of ₹120/kg. Planning to expand next season.',
                contentHi: 'इस रबी सीजन में पहली बार क्विनोआ की खेती शुरू की। फसल ने हमारी शुष्क परिस्थितियों के लिए अच्छी तरह से अनुकूलित की। गेहूं से 40% कम पानी का उपयोग किया और ₹120/किलो का प्रीमियम मूल्य मिला। अगले सीजन में विस्तार की योजना बना रहे हैं।',
                category: 'new-crops',
                likes: 67,
                comments: 19,
                isLiked: false,
                tags: ['quinoa', 'desert-farming', 'premium-crop', 'water-efficient']
            },
            {
                id: 4,
                author: 'Ramesh Singh',
                authorHi: 'रमेश सिंह',
                avatar: 'RS',
                location: 'Churu, Rajasthan',
                locationHi: 'चुरू, राजस्थान',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                title: 'Solar Pump Installation Guide',
                titleHi: 'सोलर पंप स्थापना गाइड',
                content: 'Installed 5HP solar pump last month. Complete process: 1) Apply for subsidy 2) Get technical survey 3) Installation by certified vendor 4) Commissioning. Total cost ₹3.5L, got ₹2.5L subsidy. Electricity bill now zero!',
                contentHi: 'पिछले महीने 5HP सोलर पंप स्थापित किया। पूरी प्रक्रिया: 1) सब्सिडी के लिए आवेदन 2) तकनीकी सर्वेक्षण 3) प्रमाणित विक्रेता द्वारा स्थापना 4) कमीशनिंग। कुल लागत ₹3.5L, ₹2.5L सब्सिडी मिली। बिजली का बिल अब शून्य!',
                category: 'solar-energy',
                likes: 89,
                comments: 25,
                isLiked: true,
                tags: ['solar-pump', 'subsidy', 'renewable-energy', 'cost-saving']
            },
            {
                id: 5,
                author: 'Kavita Meena',
                authorHi: 'कविता मीणा',
                avatar: 'KM',
                location: 'Barmer, Rajasthan',
                locationHi: 'बाड़मेर, राजस्थान',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                title: 'Organic Pest Control Methods',
                titleHi: 'जैविक कीट नियंत्रण विधियां',
                content: 'Sharing my organic pest control recipe: Neem oil (50ml) + Garlic paste (20g) + Soap solution (10ml) in 1L water. Spray in evening. Works great against aphids and thrips. Cost is 80% less than chemical pesticides.',
                contentHi: 'मेरी जैविक कीट नियंत्रण रेसिपी साझा कर रहे हैं: नीम तेल (50ml) + लहसुन पेस्ट (20g) + साबुन घोल (10ml) 1L पानी में। शाम को छिड़काव करें। एफिड और थ्रिप्स के खिलाफ बेहतरीन काम करता है। लागत रासायनिक कीटनाशकों से 80% कम है।',
                category: 'organic-farming',
                likes: 112,
                comments: 31,
                isLiked: false,
                tags: ['organic', 'pest-control', 'neem-oil', 'cost-effective']
            }
        ];

        this.posts = mockPosts.map(post => ({
            ...post,
            timestamp: post.timestamp,
            comments: this.generateMockComments(post.comments)
        }));
    }

    generateMockComments(commentCount) {
        const comments = [];
        const mockComments = [
            { author: 'Amit Kumar', content: 'Very helpful information, thank you!' },
            { author: 'Geeta Sharma', content: 'I will try this method in my field.' },
            { author: 'Vijay Patel', content: 'What was the exact cost breakdown?' },
            { author: 'Ravi Singh', content: 'Great results! Inspiring for new farmers.' },
            { author: 'Meera Devi', content: 'How long does the application process take?' }
        ];

        for (let i = 0; i < Math.min(commentCount, mockComments.length); i++) {
            comments.push({
                ...mockComments[i],
                timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
            });
        }

        return comments;
    }

    renderPosts() {
        const container = document.getElementById('communityPosts');
        if (!container) return;

        const currentLang = window.app ? window.app.currentLanguage : 'en';
        
        container.innerHTML = this.posts.map(post => {
            const author = currentLang === 'hi' ? post.authorHi : post.author;
            const location = currentLang === 'hi' ? post.locationHi : post.location;
            const title = currentLang === 'hi' ? post.titleHi : post.title;
            const content = currentLang === 'hi' ? post.contentHi : post.content;
            const timeAgo = this.getTimeAgo(post.timestamp, currentLang);
            
            return `
                <div class="post" data-post-id="${post.id}">
                    <div class="post-header">
                        <div class="post-avatar">${post.avatar}</div>
                        <div class="post-author-info">
                            <div class="post-author">${author}</div>
                            <div class="post-location">${location}</div>
                            <div class="post-time">${timeAgo}</div>
                        </div>
                        <div class="post-category">
                            <span class="category-tag category-${post.category}">${this.getCategoryName(post.category, currentLang)}</span>
                        </div>
                    </div>
                    
                    <div class="post-title">${title}</div>
                    <div class="post-content">${content}</div>
                    
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
                    </div>
                    
                    <div class="post-actions">
                        <button class="post-action like-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                            ${post.isLiked ? '❤️' : '🤍'} ${post.likes}
                        </button>
                        <button class="post-action comment-btn" onclick="toggleComments(${post.id})">
                            💬 ${post.comments.length}
                        </button>
                        <button class="post-action share-btn" onclick="sharePost(${post.id})">
                            📤 ${currentLang === 'hi' ? 'साझा करें' : 'Share'}
                        </button>
                    </div>
                    
                    <div class="post-comments" id="comments-${post.id}" style="display: none;">
                        ${this.renderComments(post.comments, currentLang)}
                        <div class="add-comment">
                            <textarea class="comment-input" placeholder="${currentLang === 'hi' ? 'अपनी टिप्पणी जोड़ें...' : 'Add your comment...'}"></textarea>
                            <button class="btn btn-primary" onclick="addComment(${post.id})">
                                ${currentLang === 'hi' ? 'टिप्पणी जोड़ें' : 'Add Comment'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderComments(comments, currentLang) {
        return comments.map(comment => `
            <div class="comment">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-time">${this.getTimeAgo(comment.timestamp, currentLang)}</div>
            </div>
        `).join('');
    }

    getCategoryName(category, lang) {
        const categories = {
            'crop-tips': { en: 'Crop Tips', hi: 'फसल टिप्स' },
            'irrigation': { en: 'Irrigation', hi: 'सिंचाई' },
            'new-crops': { en: 'New Crops', hi: 'नई फसलें' },
            'solar-energy': { en: 'Solar Energy', hi: 'सौर ऊर्जा' },
            'organic-farming': { en: 'Organic Farming', hi: 'जैविक खेती' }
        };
        
        return categories[category] ? categories[category][lang] : category;
    }

    getTimeAgo(timestamp, lang) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (lang === 'hi') {
            if (minutes < 60) return `${minutes} मिनट पहले`;
            if (hours < 24) return `${hours} घंटे पहले`;
            return `${days} दिन पहले`;
        } else {
            if (minutes < 60) return `${minutes} minutes ago`;
            if (hours < 24) return `${hours} hours ago`;
            return `${days} days ago`;
        }
    }

    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.isLiked = !post.isLiked;
            post.likes += post.isLiked ? 1 : -1;
            this.renderPosts();
        }
    }

    toggleComments(postId) {
        const commentsDiv = document.getElementById(`comments-${postId}`);
        if (commentsDiv) {
            commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
        }
    }

    addComment(postId) {
        const post = this.posts.find(p => p.id === postId);
        const commentInput = document.querySelector(`#comments-${postId} .comment-input`);
        
        if (post && commentInput && commentInput.value.trim()) {
            const newComment = {
                author: this.currentUser.name,
                content: commentInput.value.trim(),
                timestamp: new Date()
            };
            
            post.comments.push(newComment);
            commentInput.value = '';
            this.renderPosts();
            this.toggleComments(postId); // Show comments after adding
        }
    }

    sharePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            const shareData = {
                title: post.title,
                text: post.content.substring(0, 100) + '...',
                url: window.location.href
            };
            
            if (navigator.share) {
                navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support Web Share API
                const textArea = document.createElement('textarea');
                textArea.value = `${post.title}\n${post.content}\n\nShared from DesertSmart AgriHub`;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Post content copied to clipboard!');
            }
        }
    }

    showNewPostForm() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Share Your Experience</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <form class="new-post-form" onsubmit="submitNewPost(event)">
                    <div class="form-group">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-input" name="title" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select class="form-select" name="category" required>
                            <option value="">Select Category</option>
                            <option value="crop-tips">Crop Tips</option>
                            <option value="irrigation">Irrigation</option>
                            <option value="new-crops">New Crops</option>
                            <option value="solar-energy">Solar Energy</option>
                            <option value="organic-farming">Organic Farming</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Your Experience</label>
                        <textarea class="form-input" name="content" rows="6" required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Tags (comma separated)</label>
                        <input type="text" class="form-input" name="tags" placeholder="e.g., irrigation, water-saving, drip">
                    </div>
                    <button type="submit" class="btn btn-primary">Share Experience</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    submitNewPost(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const newPost = {
            id: this.posts.length + 1,
            author: this.currentUser.name,
            authorHi: this.currentUser.nameHi,
            avatar: this.currentUser.avatar,
            location: this.currentUser.location,
            locationHi: this.currentUser.locationHi,
            timestamp: new Date(),
            title: formData.get('title'),
            titleHi: formData.get('title'), // In a real app, this would be translated
            content: formData.get('content'),
            contentHi: formData.get('content'), // In a real app, this would be translated
            category: formData.get('category'),
            likes: 0,
            comments: [],
            isLiked: false,
            tags: formData.get('tags').split(',').map(tag => tag.trim())
        };
        
        this.posts.unshift(newPost); // Add to beginning
        this.renderPosts();
        
        // Close modal
        document.querySelector('.modal-overlay').remove();
        
        // Show success message
        this.showSuccessMessage('Your experience has been shared with the community!');
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Global functions for event handlers
function toggleLike(postId) {
    if (window.communityForum) {
        window.communityForum.toggleLike(postId);
    }
}

function toggleComments(postId) {
    if (window.communityForum) {
        window.communityForum.toggleComments(postId);
    }
}

function addComment(postId) {
    if (window.communityForum) {
        window.communityForum.addComment(postId);
    }
}

function sharePost(postId) {
    if (window.communityForum) {
        window.communityForum.sharePost(postId);
    }
}

function showNewPostForm() {
    if (window.communityForum) {
        window.communityForum.showNewPostForm();
    }
}

function submitNewPost(event) {
    if (window.communityForum) {
        window.communityForum.submitNewPost(event);
    }
}

// Load community posts
function loadCommunityPosts() {
    if (!window.communityForum) {
        window.communityForum = new CommunityForum();
    }
    window.communityForum.renderPosts();
}

// Add CSS for community components
const communityCSS = `
    .post {
        background: #F9FAFB;
        border-radius: 0.75rem;
        padding: 1.5rem;
        border: 1px solid #E5E7EB;
        margin-bottom: 1.5rem;
        transition: all 0.3s;
    }
    
    .post:hover {
        border-color: #F97316;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .post-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .post-avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #F97316, #EA580C);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 0.875rem;
        flex-shrink: 0;
    }
    
    .post-author-info {
        flex: 1;
    }
    
    .post-author {
        font-weight: 600;
        color: #1F2937;
        margin-bottom: 0.25rem;
    }
    
    .post-location {
        font-size: 0.875rem;
        color: #6B7280;
        margin-bottom: 0.25rem;
    }
    
    .post-time {
        font-size: 0.75rem;
        color: #9CA3AF;
    }
    
    .post-category {
        flex-shrink: 0;
    }
    
    .category-tag {
        background: #EBF8FF;
        color: #1E40AF;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .category-crop-tips {
        background: #F0FDF4;
        color: #166534;
    }
    
    .category-irrigation {
        background: #EFF6FF;
        color: #1D4ED8;
    }
    
    .category-new-crops {
        background: #FEF3C7;
        color: #92400E;
    }
    
    .category-solar-energy {
        background: #FECACA;
        color: #B91C1C;
    }
    
    .category-organic-farming {
        background: #D1FAE5;
        color: #065F46;
    }
    
    .post-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1F2937;
        margin-bottom: 0.75rem;
    }
    
    .post-content {
        color: #4B5563;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .post-tag {
        background: #F3F4F6;
        color: #6B7280;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .post-actions {
        display: flex;
        gap: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #E5E7EB;
    }
    
    .post-action {
        background: none;
        border: none;
        color: #6B7280;
        cursor: pointer;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem;
        border-radius: 0.375rem;
        transition: all 0.3s;
    }
    
    .post-action:hover {
        background: #F3F4F6;
        color: #374151;
    }
    
    .like-btn.liked {
        color: #EF4444;
    }
    
    .post-comments {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #E5E7EB;
    }
    
    .comment {
        background: white;
        border-radius: 0.5rem;
        padding: 0.75rem;
        margin-bottom: 0.75rem;
        border: 1px solid #E5E7EB;
    }
    
    .comment-author {
        font-weight: 600;
        color: #1F2937;
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
    }
    
    .comment-content {
        color: #4B5563;
        font-size: 0.875rem;
        line-height: 1.5;
        margin-bottom: 0.25rem;
    }
    
    .comment-time {
        color: #9CA3AF;
        font-size: 0.75rem;
    }
    
    .add-comment {
        background: white;
        border-radius: 0.5rem;
        padding: 1rem;
        border: 1px solid #E5E7EB;
    }
    
    .comment-input {
        width: 100%;
        border: 1px solid #D1D5DB;
        border-radius: 0.375rem;
        padding: 0.75rem;
        font-size: 0.875rem;
        resize: vertical;
        margin-bottom: 0.75rem;
    }
    
    .comment-input:focus {
        outline: none;
        border-color: #F97316;
        box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: white;
        border-radius: 0.75rem;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #1F2937;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6B7280;
    }
    
    .new-post-form {
        display: grid;
        gap: 1rem;
    }
    
    .success-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 500;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .post-header {
            flex-wrap: wrap;
        }
        
        .post-actions {
            flex-wrap: wrap;
        }
        
        .modal-content {
            width: 95%;
            padding: 1.5rem;
        }
    }
`;

// Inject CSS
const communityStyle = document.createElement('style');
communityStyle.textContent = communityCSS;
document.head.appendChild(communityStyle);