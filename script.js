// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Food Picker Functionality
const foodOptions = [
    '麻辣香锅', '黄焖鸡米饭', '沙县小吃', '兰州拉面', '重庆小面',
    '麻辣烫', '煲仔饭', '烤肉拌饭', '酸菜鱼', '水煮肉片',
    '宫保鸡丁', '鱼香肉丝', '回锅肉', '麻婆豆腐', '糖醋里脊',
    '红烧肉', '白切鸡', '烤鸭', '火锅', '烧烤',
    '寿司', '披萨', '汉堡', '炸鸡', '意面',
    '煎饼果子', '肉夹馍', '凉皮', '酸辣粉', '螺蛳粉'
];

let foodHistoryList = [];

function initFoodPicker() {
    const foodBtn = document.getElementById('foodBtn');
    const foodResult = document.getElementById('foodResult');
    const foodHistory = document.getElementById('foodHistory');

    console.log('Initializing food picker, elements found:', {
        foodBtn: !!foodBtn,
        foodResult: !!foodResult,
        foodHistory: !!foodHistory
    });

    if (foodBtn && foodResult) {
        console.log('Food picker elements found, adding event listener');

        foodBtn.addEventListener('click', function() {
            console.log('Food button clicked!');

            // Simple test first
            foodResult.textContent = '测试成功！正在选择...';

            // Disable button during animation
            this.disabled = true;

            setTimeout(() => {
                // Random selection
                const randomFood = foodOptions[Math.floor(Math.random() * foodOptions.length)];
                foodResult.textContent = `今天吃：${randomFood} 🍽️`;

                // Add to history
                foodHistoryList.unshift(randomFood);
                if (foodHistoryList.length > 5) {
                    foodHistoryList.pop();
                }

                updateFoodHistory(foodHistory);

                // Re-enable button
                this.disabled = false;
            }, 1000);
        });

        // Visual feedback that button is ready
        foodBtn.style.cursor = 'pointer';
        foodBtn.title = '点击选择今天吃什么';
        console.log('Food picker initialized successfully');
    } else {
        console.error('Food picker elements not found');
    }
}

function updateFoodHistory(foodHistory) {
    if (foodHistoryList.length > 0 && foodHistory) {
        foodHistory.innerHTML = '<h4>最近选择：</h4>' +
            foodHistoryList.map(food => `<span class="history-item">${food}</span>`).join('');
    }
}

// Initialize food picker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing food picker...');
    initFoodPicker();
});

// Portfolio hover effects and click functionality
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    // Add click functionality
    item.addEventListener('click', function(e) {
        // 防止事件冒泡到overlay
        if (e.target.classList.contains('portfolio-overlay') || e.target.closest('.portfolio-overlay')) {
            return;
        }

        const img = this.querySelector('img');
        const video = this.querySelector('video');
        const title = this.querySelector('h3')?.textContent || '作品';

        if (img) {
            // 图片全屏显示
            showFullscreen(img.src, title, img.alt);
        } else if (video) {
            // 视频全屏显示
            showVideoFullscreen(video, title);
        }
    });

    // 添加点击光标提示
    item.style.cursor = 'pointer';
});

// 全屏显示图片功能
function showFullscreen(src, title, alt) {
    // 创建全屏遮罩
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;

    // 创建图片
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
        animation: scaleIn 0.3s ease;
    `;

    // 创建标题
    const titleEl = document.createElement('div');
    titleEl.textContent = title;
    titleEl.style.cssText = `
        color: #00ffff;
        font-size: 1.5rem;
        margin-top: 20px;
        text-align: center;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    `;

    // 创建关闭提示
    const closeHint = document.createElement('div');
    closeHint.textContent = '点击任意位置关闭';
    closeHint.style.cssText = `
        color: #888;
        font-size: 0.9rem;
        margin-top: 10px;
        opacity: 0.7;
    `;

    // 组装全屏显示
    overlay.appendChild(img);
    overlay.appendChild(titleEl);
    overlay.appendChild(closeHint);

    // 添加到页面
    document.body.appendChild(overlay);

    // 点击关闭功能
    overlay.addEventListener('click', function() {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    });

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// 全屏显示视频功能
function showVideoFullscreen(video, title) {
    // 创建全屏遮罩
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;

    // 创建视频元素
    const fullscreenVideo = document.createElement('video');
    fullscreenVideo.controls = true;
    fullscreenVideo.autoplay = true;
    fullscreenVideo.style.cssText = `
        max-width: 90%;
        max-height: 70%;
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
        animation: scaleIn 0.3s ease;
    `;

    // 复制源文件
    const sources = video.querySelectorAll('source');
    sources.forEach(source => {
        const newSource = document.createElement('source');
        newSource.src = source.src;
        newSource.type = source.type;
        fullscreenVideo.appendChild(newSource);
    });

    // 创建标题
    const titleEl = document.createElement('div');
    titleEl.textContent = title;
    titleEl.style.cssText = `
        color: #00ffff;
        font-size: 1.5rem;
        margin-top: 20px;
        text-align: center;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    `;

    // 创建关闭提示
    const closeHint = document.createElement('div');
    closeHint.textContent = '点击任意位置关闭';
    closeHint.style.cssText = `
        color: #888;
        font-size: 0.9rem;
        margin-top: 10px;
        opacity: 0.7;
    `;

    // 组装全屏显示
    overlay.appendChild(fullscreenVideo);
    overlay.appendChild(titleEl);
    overlay.appendChild(closeHint);

    // 添加到页面
    document.body.appendChild(overlay);

    // 点击关闭功能
    overlay.addEventListener('click', function(e) {
        if (e.target !== fullscreenVideo) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }
    });

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Simple scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0px)';
        }
    });
}, { threshold: 0.1 });

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add floating animation to skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'float 3s ease-in-out infinite';
});

// Simple scroll effect for navbar
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }

    lastScrollTop = scrollTop;
}, { passive: true });


// Add glow effect to section titles on scroll
document.querySelectorAll('.section-title').forEach(title => {
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                title.style.textShadow = '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.6)';
            } else {
                title.style.textShadow = 'none';
            }
        });
    }, { threshold: 0.5 });

    titleObserver.observe(title);
});

// Add ripple effect to buttons
document.querySelectorAll('.food-btn, .project-link, .social-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Show first section immediately with special effect
    const firstSection = document.querySelector('section');
    if (firstSection) {
        setTimeout(() => {
            firstSection.style.opacity = '1';
            firstSection.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        }, 500);
    }
});


// 微信二维码显示功能
function showWechatQR() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;

    // 创建二维码容器
    const qrContainer = document.createElement('div');
    qrContainer.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 300px;
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        animation: scaleIn 0.3s ease;
    `;

    // 创建标题
    const title = document.createElement('h3');
    title.textContent = '微信二维码';
    title.style.cssText = `
        margin: 0 0 20px 0;
        color: #333;
        font-size: 1.5rem;
    `;

    // 创建二维码图片
    const qrImage = document.createElement('img');
    qrImage.src = 'eef5cb6139062e7710cd7c698bda8d2f.jpg';
    qrImage.alt = '微信二维码';
    qrImage.style.cssText = `
        width: 200px;
        height: 200px;
        border-radius: 10px;
        margin: 0 auto 20px auto;
        display: block;
        object-fit: cover;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

    // 图片加载失败时的备用显示
    qrImage.onerror = function() {
        qrImage.style.display = 'none';
        const errorMsg = document.createElement('div');
        errorMsg.textContent = '二维码图片加载失败';
        errorMsg.style.cssText = `
            width: 200px;
            height: 200px;
            background: #f0f0f0;
            border-radius: 10px;
            margin: 0 auto 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
        `;
        qrContainer.insertBefore(errorMsg, qrImage.nextSibling);
    };

    // 创建提示文字
    const hint = document.createElement('p');
    hint.textContent = '扫码添加微信';
    hint.style.cssText = `
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    `;

    // 创建关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '关闭';
    closeBtn.style.cssText = `
        margin-top: 15px;
        padding: 8px 20px;
        background: #00ffff;
        color: #000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.background = '#00cccc';
        closeBtn.style.transform = 'scale(1.05)';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.background = '#00ffff';
        closeBtn.style.transform = 'scale(1)';
    });

    // 组装模态框
    qrContainer.appendChild(title);
    qrContainer.appendChild(qrImage);
    qrContainer.appendChild(hint);
    qrContainer.appendChild(closeBtn);
    modal.appendChild(qrContainer);

    // 添加到页面
    document.body.appendChild(modal);

    // 关闭功能
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        qrContainer.style.animation = 'scaleOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    // 点击关闭按钮
    closeBtn.addEventListener('click', closeModal);

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes scaleOut {
            from { transform: scale(1); opacity: 1; }
            to { transform: scale(0.8); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Contact form functionality (if you want to add a contact form later)
// For now, we'll add click effects to contact items
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    item.addEventListener('click', () => {
        const text = item.querySelector('span').textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = item.querySelector('span').textContent;
            item.querySelector('span').textContent = '已复制!';
            setTimeout(() => {
                item.querySelector('span').textContent = originalText;
            }, 1000);
        });
    });

    item.style.cursor = 'pointer';
    item.title = '点击复制';
});

// 只为抖音下面的微信链接添加点击事件（不改变第一个微信联系方式的样式）
const wechatLink = document.getElementById('wechat-link');
if (wechatLink) {
    wechatLink.addEventListener('click', (e) => {
        e.preventDefault();
        showWechatQR();
    });
    wechatLink.title = '点击显示微信二维码';
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Show first section immediately
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'translateY(0)';
    }

    // Initialize particles if available
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: ['#00ffff', '#ff00ff', '#ffffff'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.4, random: true },
                    size: { value: 2, random: true },
                    line_linked: { enable: true, distance: 120, color: '#00ffff', opacity: 0.1, width: 1 },
                    move: { enable: true, speed: 0.5, direction: 'none', random: true, straight: false, out_mode: 'out' }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { grab: { distance: 100, line_linked: { opacity: 0.5 } }, push: { particles_nb: 2 } }
                },
                retina_detect: true
            });
        } catch (e) {
            console.log('Particles initialization failed:', e);
        }
    }
});