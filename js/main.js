// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Spinner Logic
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingSpinner.classList.add('hidden');
                setTimeout(() => loadingSpinner.remove(), 500);
            }, 1000);
        });
    }

    // 2. Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navIcon = hamburger ? hamburger.querySelector('i') : null;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navIcon) navIcon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (navIcon) navIcon.classList.remove('fa-times');
            });
        });
    }

    // 3. Smooth scrolling for anchor links
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

    // 4. Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. Unified Modal Logic
    const modals = document.querySelectorAll('.modal-overlay');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) closeModal(modal);
            });
        }
    });

    // 6. Project Demo Modal
    const demoBtns = document.querySelectorAll(".demo-btn");
    const demoModal = document.getElementById("demoModal");
    if (demoModal) {
        const demoTitle = demoModal.querySelector(".project-title");
        const demoVideo = demoModal.querySelector(".demo-video source");
        const demoImg = demoModal.querySelector(".demo-img");

        demoBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (demoTitle) demoTitle.textContent = btn.dataset.title;
                if (demoVideo) demoVideo.src = btn.dataset.video;
                if (demoImg) demoImg.src = btn.dataset.img;

                if (demoVideo && demoVideo.parentElement) {
                    demoVideo.parentElement.load();
                }
                openModal("demoModal");
            });
        });
    }

    // 7. Bug Bounty Proof Modal
    const bugProofButtons = document.querySelectorAll('.bug-proof-btn');
    const proofMedia = document.getElementById('proof-media');
    const proofDetails = document.getElementById('proof-details');

    const proofData = {
        'xss-proof': {
            content: '<div style="width:100%; height:300px; background:linear-gradient(135deg, #667eea, #764ba2); display:flex; align-items:center; justify-content:center;"><i class="fas fa-image" style="font-size: 4rem; color: white;"></i></div>',
            title: 'Cross-Site Scripting (XSS) Proof',
            description: 'Demonstration of stored XSS vulnerability in user profile section. The vulnerability allowed injection of malicious scripts that would execute when other users viewed the profile.'
        },
        'sql-proof': {
            content: '<div style="width:100%; height:300px; background:linear-gradient(135deg, #f093fb, #f5576c); display:flex; align-items:center; justify-content:center;"><i class="fas fa-video" style="font-size: 4rem; color: white;"></i></div>',
            title: 'SQL Injection Proof',
            description: 'Video demonstration of SQL injection vulnerability in search functionality. The vulnerability allowed extraction of database information through crafted search queries.'
        },
        'info-proof': {
            content: '<div style="width:100%; height:300px; background:linear-gradient(135deg, #4facfe, #00f2fe); display:flex; align-items:center; justify-content:center;"><i class="fas fa-image" style="font-size: 4rem; color: white;"></i></div>',
            title: 'Information Disclosure Proof',
            description: 'Screenshot showing sensitive information exposed in server responses. The issue revealed internal system details that could be leveraged for further attacks.'
        }
    };

    bugProofButtons.forEach(button => {
        button.addEventListener('click', () => {
            const proofId = button.getAttribute('data-proof');
            const proof = proofData[proofId];
            if (proof && proofMedia && proofDetails) {
                proofMedia.innerHTML = proof.content;
                proofDetails.innerHTML = `<h3>${proof.title}</h3><p>${proof.description}</p>`;
                openModal('proof-modal');
            }
        });
    });

    // 8. Progress Modal Detail logic
    const progressViewButtons = document.querySelectorAll('.progress-view-btn');
    const progressData = {
        'splunk-siem': {
            title: 'Windows Log Monitoring with Splunk SIEM',
            description: 'Designed and implemented a home SOC lab to monitor Windows authentication events using Splunk Enterprise. Windows 11 security logs were collected via Splunk Universal Forwarder, enabling centralized log management and real-time monitoring of user logins.',
            features: [
                "Centralized collection of Windows Event Logs",
                "Real-time detection of successful logins (Event ID 4624)",
                "User activity visibility (username, logon type, source machine)",
                "Log search and filtering using SPL",
                "Foundation for threat detection, including brute-force attempts and anomalous login patterns",
                "Simulates SOC monitoring and alert workflows"
            ],
            technologies: [
                "Splunk Enterprise – SIEM platform",
                "Splunk Universal Forwarder – log collection",
                "Windows 11 – log source",
                "Linux – Splunk server host",
                "Windows Security Event Logs (4624, 4625)",
                "Search Processing Language (SPL)",
                "TCP/UDP log forwarding"
            ],
            image: 'assets/Images/Splunk_Home.jpg',
            // githubUrl: '#',
            // demoUrl: '#'
        },
        // 'network-security': {
        //     title: 'Network Security Lab',
        //     description: 'Enterprise-grade network security monitoring lab with intrusion detection, firewall configuration, and traffic analysis.',
        //     features: ['PfSense firewall', 'Suricata IDS/IPS', 'Network segmentation', 'VPN configuration'],
        //     technologies: ['PfSense', 'Suricata', 'VLAN', 'VPN'],
        //     image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+TmV0d29yayBTZWN1cml0eSBMYWI8L3RleHQ+Cjwvc3ZnPg==',
        //     githubUrl: '#',
        //     demoUrl: '#'
        // },
        // 'web-app-security': {
        //     title: 'Web Application Security Lab',
        //     description: 'Comprehensive web app pentesting environment.',
        //     features: ['DVWA & WebGoat', 'Burp Suite testing', 'OWASP Top 10', 'API security'],
        //     technologies: ['Burp Suite', 'OWASP', 'Docker'],
        //     image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+V2ViIEFwcCBTZWN1cml0eSBMYWI8L3RleHQ+Cjwvc3ZnPg==',
        //     githubUrl: '#',
        //     demoUrl: '#'
        // }


    };

    progressViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-progress');
            const data = progressData[id];
            if (data) {
                document.getElementById('progress-modal-title').textContent = data.title;
                document.getElementById('progress-modal-description').textContent = data.description;
                document.getElementById('progress-modal-image').src = data.image;

                const featuresList = document.getElementById('progress-modal-features');
                featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

                const techContainer = document.getElementById('progress-modal-tech');
                techContainer.innerHTML = data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');

                document.getElementById('progress-modal-github').href = data.githubUrl;
                document.getElementById('progress-modal-demo').href = data.demoUrl;

                openModal('progress-modal');
            }
        });
    });

    // 9. Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Oops! There was a problem sending your message. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});
