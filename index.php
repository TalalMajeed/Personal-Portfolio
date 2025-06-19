<?php
$formSubmitted = false;
$formSuccess = false;
$formError = false;
$errorMessage = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formSubmitted = true;
    
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';
    
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $formError = true;
        $errorMessage = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $formError = true;
        $errorMessage = "Invalid email format.";
    } else {
        $to = "talal@codexon.pk";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: $name <$email>" . "\r\n";
        
        $emailBody = "
            <html>
            <head>
                <title>$subject</title>
            </head>
            <body>
                <h2>Contact Form Submission</h2>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Message:</strong></p>
                <p>$message</p>
            </body>
            </html>
        ";
        
        require 'PHPMailer.php';
        require 'SMTP.php';
        require 'Exception.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'outreach@developertest.cloud';
        $mail->Password = 'Ethereum360#';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        
        $mail->setFrom('talal@codexon.pk', 'Contact Form');
        $mail->addAddress('talal@codexon.pk');
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $emailBody;
        
        if ($mail->send()) {
            $formSuccess = true;
        } else {
            $formError = true;
            $errorMessage = "Message could not be sent. Mailer Error: " . $mail->ErrorInfo;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Talal Majeed | Tech Lead & Software Developer</title>

    <meta
      name="title"
      content="Talal Majeed | Tech Lead & Software Developer"
    />
    <meta
      name="description"
      content="Tech Lead at Codexon with 8+ years of experience in AWS, Kubernetes, and blockchain development. Expertise in cloud solutions and full-stack development."
    />
    <meta
      name="keywords"
      content="Talal Majeed, Software Developer, Tech Lead, AWS, Kubernetes, Blockchain, Cloud Engineering, Full Stack Developer, Codexon, React, Vue.js"
    />
    <meta name="author" content="Talal Majeed" />
    <meta name="robots" content="index, follow" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://talalmajeed.com/" />
    <meta
      property="og:title"
      content="Talal Majeed | Tech Lead & Software Developer"
    />
    <meta
      property="og:description"
      content="Tech Lead at Codexon with 8+ years of experience in AWS, Kubernetes, and blockchain development."
    />
    <meta
      property="og:image"
      content="https://talalmajeed.com/images/profile.jpg"
    />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://talalmajeed.com/" />
    <meta
      property="twitter:title"
      content="Talal Majeed | Tech Lead & Software Developer"
    />
    <meta
      property="twitter:description"
      content="Tech Lead at Codexon with 8+ years of experience in AWS, Kubernetes, and blockchain development."
    />
    <meta
      property="twitter:image"
      content="https://talalmajeed.com/images/profile.jpg"
    />

    <link rel="icon" type="image/png" href="favicon.png" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <link rel="stylesheet" href="styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <link rel="canonical" href="https://talalmajeed.com/" />
  </head>
  <body>
    <div class="page-overlay"></div>
    
    <?php if ($formSuccess): ?>
    <div id="success-banner" class="success-banner">
      <div class="success-content">
        <i class="fas fa-check-circle"></i>
        <p>Message Sent Successfully!</p>
        <button id="close-success" class="close-success"><i class="fas fa-times"></i></button>
      </div>
    </div>
    <?php endif; ?>
    
    <header id="header">
      <div class="container header-container">
        <a href="#" class="logo">Talal</a>
        <button class="mobile-nav-toggle" id="mobile-nav-toggle">
          <i class="fas fa-bars" style="color: white"></i>
        </button>
        <nav class="desktop-nav">
          <ul id="navbar">
            <li><a href="#hero" class="nav-link">Home</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#upwork" class="nav-link">Upwork</a></li>
            <li><a href="#projects" class="nav-link">Projects</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
    
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav-header">
        <div class="logo">Talal</div>
        <button class="close-mobile-nav" id="close-mobile-nav">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="mobile-nav-links">
        <li><a href="#hero" class="mobile-nav-link">Home</a></li>
        <li><a href="#about" class="mobile-nav-link">About</a></li>
        <li><a href="#upwork" class="mobile-nav-link">Upwork</a></li>
        <li><a href="#projects" class="mobile-nav-link">Projects</a></li>
        <li><a href="#contact" class="mobile-nav-link">Contact</a></li>
      </ul>
      <div class="mobile-nav-social">
        <a href="https://linkedin.com/in/talalmajeed" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        <a href="mailto:talal@codexon.pk"><i class="fas fa-envelope"></i></a>
        <a href="https://github.com/TalalMajeed" target="_blank"><i class="fab fa-github"></i></a>
      </div>
    </div>

    <section id="hero">
      <div class="container hero-content hero-text">
        <h1 class="animate-on-scroll fade-in-up">Hi, I'm <span class="highlight-text">Talal Majeed</span></h1>
        <h2 class="animate-on-scroll fade-in-up delay-200">Tech Lead | Codexon | Software Dev</h2>
        <p class="animate-on-scroll fade-in-up delay-400">
          Passionate tech professional with 8+ years of coding experience,
          specializing in AWS cloud solutions, Kubernetes, and blockchain
          development.
        </p>
        <div class="hero-buttons animate-on-scroll fade-in-up delay-600">
          <a href="#contact" class="btn cta-btn">Get In Touch</a>
          <a href="#projects" class="btn btn-outline">See My Work</a>
          <div class="social-links">
            <a href="https://linkedin.com/in/talalmajeed" target="_blank" class="social-icon-anim"><i class="fab fa-linkedin-in"></i></a>
            <a href="mailto:talal@codexon.pk" class="social-icon-anim"><i class="fas fa-envelope"></i></a>
            <a href="https://github.com/TalalMajeed" target="_blank" class="social-icon-anim"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>
      <div class="code-particles"></div>
    </section>

    <section id="about">
      <div class="container">
        <div class="section-title animate-on-scroll fade-in-up">
          <h2>About Me</h2>
        </div>
        <div class="about-content">
          <div class="about-text animate-on-scroll fade-in-right">
            <h3>Head of Technology at Codexon Solutions</h3>
            <p>
              I'm a passionate tech professional with a BS in Computer Science
              from NUST University. With over 8 years of coding experience and 2
              years of professional work experience, I've developed expertise in
              cloud-native architectures, blockchain solutions, and full-stack
              development.
            </p>
            <p>
              Currently, I'm focused on cloud engineering with AWS and
              Kubernetes while researching blockchain and fintech solutions
              through my project Solidio AI. I'm also the founder of the Codexon
              Team at NUST and collaborate with Adix Solutions based in Germany.
            </p>
            <div class="tech-stack">
              <h4 class="tech-title">Cloud & DevOps</h4>
              <div class="tech-badges">
                <span class="tech-badge badge-anim">AWS</span>
                <span class="tech-badge badge-anim">Kubernetes</span>
                <span class="tech-badge badge-anim">Docker</span>
                <span class="tech-badge badge-anim">Azure</span>
              </div>

              <h4 class="tech-title">Development</h4>
              <div class="tech-badges">
                <span class="tech-badge badge-anim">React</span>
                <span class="tech-badge badge-anim">Vue.js</span>
                <span class="tech-badge badge-anim">Python</span>
                <span class="tech-badge badge-anim">Node.js</span>
                <span class="tech-badge badge-anim">Django</span>
                <span class="tech-badge badge-anim">MongoDB</span>
                <span class="tech-badge badge-anim">PostgreSQL</span>
              </div>

              <h4 class="tech-title">Blockchain</h4>
              <div class="tech-badges">
                <span class="tech-badge badge-anim">Ethereum</span>
                <span class="tech-badge badge-anim">Solidity</span>
                <span class="tech-badge badge-anim">Web3.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="upwork">
      <div class="container">
        <div class="section-title animate-on-scroll fade-in-up">
          <h2>Hire Me on Upwork</h2>
        </div>
        <div class="upwork-content">
          <div class="upwork-info animate-on-scroll fade-in-left">
            <div class="upwork-logo">
              <i class="fab fa-upwork"></i>
            </div>
            <h3>Ready to Work on Your Project</h3>
            <div class="upwork-stats">
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Job Success</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">2+</div>
                <div class="stat-label">Industry Experience</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">15+</div>
                <div class="stat-label">Projects Completed</div>
              </div>
            </div>
            <div class="upwork-services">
              <h4>Services I Offer:</h4>
              <ul>
                <li><i class="fas fa-cloud"></i> Cloud Architecture & AWS Solutions</li>
                <li><i class="fas fa-code"></i> Full-Stack Web Development</li>
                <li><i class="fas fa-link"></i> Blockchain & Smart Contract Development</li>
                <li><i class="fas fa-cogs"></i> DevOps & Kubernetes Implementation</li>
                <li><i class="fas fa-mobile-alt"></i> API Development & Integration</li>
              </ul>
            </div>
          </div>
          <div class="upwork-cta animate-on-scroll fade-in-right">
            <div class="upwork-card">
              <div class="upwork-card-header">
                <i class="fab fa-upwork"></i>
                <h4>Let's Work Together</h4>
              </div>
              <p>
                Ready to start your next project? I'm here to help you achieve your goals 
                with professional, high-quality solutions.
              </p>
              <a href="https://www.upwork.com/freelancers/~0157c5ba50d278cc2a" target="_blank" class="upwork-btn">
                <i class="fab fa-upwork"></i>
                View My Upwork Profile
              </a>
              <div class="upwork-features">
                <div class="feature">
                  <i class="fas fa-clock"></i>
                  <span>Fast Delivery</span>
                </div>
                <div class="feature">
                  <i class="fas fa-comments"></i>
                  <span>Clear Communication</span>
                </div>
                <div class="feature">
                  <i class="fas fa-shield-alt"></i>
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects">
      <div class="container">
        <div class="section-title animate-on-scroll fade-in-up">
          <h2>My Projects</h2>
        </div>
        <div class="projects-container">
          <div class="project-card animate-on-scroll fade-in-up">
            <div class="project-image">
              <i class="fas fa-diagram-project"></i>
            </div>
            <div class="project-info">
              <h3>NeuroFlow AI</h3>
              <p>
                An AI-powered platform for building visual planners & diagrams,
                built with Python and React.
              </p>
              <div class="project-tags">
                <span class="project-tag">Python</span>
                <span class="project-tag">React</span>
                <span class="project-tag">OpenAI</span>
                <span class="project-tag">AWS</span>
              </div>
              <div class="project-links">
                <a
                  href="https://github.com/TalalMajeed/NeuroFlow-AI"
                  target="_blank"
                  class="project-link-anim"
                ><i class="fab fa-github"></i> Repository</a>
                <a href="#" class="project-link-anim"><i class="fas fa-external-link-alt"></i> Live Demo</a>
              </div>
            </div>
          </div>

          <div class="project-card animate-on-scroll fade-in-up delay-200">
            <div class="project-image">
              <i class="fa-solid fa-fax"></i>
            </div>
            <div class="project-info">
              <h3>Oracis AI</h3>
              <p>
                An AI Powered Platform which connects companies and individuals
                seeking professional opportunities!
              </p>
              <div class="project-tags">
                <span class="project-tag">Solidity</span>
                <span class="project-tag">Puppeteer</span>
                <span class="project-tag">Node.js</span>
                <span class="project-tag">React</span>
              </div>
              <div class="project-links">
                <a
                  href="https://github.com/TalalMajeed/Oracis-AI"
                  target="_blank"
                  class="project-link-anim"
                ><i class="fab fa-github"></i> Repository</a>
                <a href="#" class="project-link-anim"><i class="fas fa-external-link-alt"></i> Live Demo</a>
              </div>
            </div>
          </div>

          <div class="project-card animate-on-scroll fade-in-up delay-400">
            <div class="project-image">
              <i class="fa-solid fa-coins"></i>
            </div>
            <div class="project-info">
              <h3>Solidio AI</h3>
              <p>
                An AI-assisted platform for smart contract auditing and
                vulnerability detection using machine learning.
              </p>
              <div class="project-tags">
                <span class="project-tag">Python</span>
                <span class="project-tag">Solidity</span>
                <span class="project-tag">Machine Learning</span>
                <span class="project-tag">Blockchain</span>
              </div>
              <div class="project-links">
                <a href="#" class="project-link-anim"><i class="fab fa-github"></i> Repository</a>
                <a href="#" class="project-link-anim"><i class="fas fa-external-link-alt"></i> Live Demo</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact">
      <div class="container">
        <div class="section-title animate-on-scroll fade-in-up">
          <h2>Get In Touch</h2>
        </div>
        <div class="contact-wrapper">
          <div class="contact-info animate-on-scroll fade-in-left">
            <h3>Let's Talk</h3>
            <p>
              Feel free to reach out if you're looking for a developer, have a
              question, or just want to connect.
            </p>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-detail">
                <h4>Email</h4>
                <a href="mailto:talal@codexon.pk">talal@codexon.pk</a>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-detail">
                <h4>Location</h4>
                <div>Islamabad, Pakistan</div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fab fa-linkedin-in"></i>
              </div>
              <div class="contact-detail">
                <h4>LinkedIn</h4>
                <a href="https://linkedin.com/in/talalmajeed" target="_blank"
                  >linkedin.com/in/talalmajeed</a>
              </div>
            </div>
          </div>

          <div class="contact-form animate-on-scroll fade-in-right">
            <h3>Send Me a Message</h3>
            <?php if ($formError): ?>
            <div class="form-error">
              <p><?php echo $errorMessage; ?></p>
            </div>
            <?php endif; ?>
            
            <form id="contact-form" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>#contact">
              <div class="form-group">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="subject"
                  class="form-control"
                  placeholder="Subject"
                  required
                />
              </div>
              <div class="form-group">
                <textarea
                  name="message"
                  class="form-control"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button type="submit" class="submit-btn btn-pulse">
                <i class="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">Talal</div>
          <div class="footer-links">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div class="footer-social">
            <a href="https://linkedin.com/in/talalmajeed" target="_blank"
              ><i class="fab fa-linkedin-in"></i
            ></a>
            <a href="https://github.com/TalalMajeed" target="_blank"
              ><i class="fab fa-github"></i
            ></a>
          </div>
        </div>
      </div>
    </footer>
    
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const mobileNavToggle = document.getElementById('mobile-nav-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const closeMobileNav = document.getElementById('close-mobile-nav');
        const pageOverlay = document.querySelector('.page-overlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const header = document.getElementById('header');
        const successBanner = document.getElementById('success-banner');
        const closeSuccess = document.getElementById('close-success');
        
        // Cache animated elements to avoid repeated DOM queries
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        let ticking = false;
        
        // Throttle scroll events for better performance
        function updateAnimations() {
          const screenPosition = window.innerHeight / 1.2;
          
          animatedElements.forEach(element => {
            if (!element.classList.contains('animated')) {
              const elementPosition = element.getBoundingClientRect().top;
              
              if (elementPosition < screenPosition) {
                element.classList.add('animated');
              }
            }
          });
          
          ticking = false;
        }
        
        function requestTick() {
          if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
          }
        }
        
        // Optimized scroll handler
        window.addEventListener('scroll', function() {
          // Header scroll effect
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          
          // Animation trigger
          requestTick();
        }, { passive: true });
        
        // Success banner handling
        if (closeSuccess) {
          closeSuccess.addEventListener('click', function() {
            successBanner.classList.add('hide-banner');
          });
          setTimeout(function() {
            successBanner.classList.add('hide-banner');
          }, 5000);
        }
        
        // Mobile navigation
        mobileNavToggle.addEventListener('click', function() {
          mobileNav.classList.add('active');
          pageOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
        
        closeMobileNav.addEventListener('click', function() {
          mobileNav.classList.remove('active');
          pageOverlay.classList.remove('active');
          document.body.style.overflow = 'auto';
        });
        
        pageOverlay.addEventListener('click', function() {
          mobileNav.classList.remove('active');
          pageOverlay.classList.remove('active');
          document.body.style.overflow = 'auto';
        });
        
        mobileNavLinks.forEach(link => {
          link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            pageOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
          });
        });
        
        // Optimized code particles with reduced frequency
        let particleCount = 0;
        const maxParticles = 15;
        
        function createCodeParticle() {
          if (particleCount >= maxParticles) return;
          
          const codeChars = ['<', '>', '/', '{', '}', ';', '()', '[]', '=>', '&&', '||', '0', '1'];
          const particles = document.querySelector('.code-particles');
          
          if (particles) {
            const particle = document.createElement('span');
            particle.className = 'code-particle';
            particle.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
            
            const size = Math.random() * 20 + 10;
            const posX = Math.random() * window.innerWidth;
            const duration = Math.random() * 15 + 5;
            const delay = Math.random() * 5;
            
            particle.style.fontSize = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particles.appendChild(particle);
            particleCount++;
            
            setTimeout(() => {
              if (particles.contains(particle)) {
                particles.removeChild(particle);
                particleCount--;
              }
            }, (duration + delay) * 1000);
          }
        }
        
        // Reduced particle creation frequency
        setInterval(createCodeParticle, 500);
        
        // Initial animation check
        setTimeout(function() {
          const screenPosition = window.innerHeight / 1;
          
          animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < screenPosition) {
              element.classList.add('animated');
            }
          });
        }, 100);
      });
    </script>
  </body>
</html>
