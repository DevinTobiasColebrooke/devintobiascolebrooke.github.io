This is a great project. For a site that requires both a **static timeline** and a **CMS-like blog** (to update grantors easily), the best tool to use with GitHub Pages is **Jekyll**.

Jekyll is built into GitHub Pages, meaning you don't need to install complex software on your computer. You just create files in your GitHub repository, and GitHub turns them into a website automatically.

Here is a complete guide to building this site with a **Fade-in Gradient Timeline** and a **Blog**.

### Step 1: Set up the Repository
1.  Log in to GitHub.
2.  Create a new repository named `yourusername.github.io` (replace `yourusername` with your actual GitHub username).
3.  Go to **Settings** > **Pages** to confirm it is set to build from the `main` branch (root).

### Step 2: Create the File Structure
You can create these files directly in the browser on GitHub by clicking "Add file" > "Create new file", or by uploading them from your computer.

Your folder structure will look like this:
```text
/
├── _config.yml          (Site settings)
├── _data/
│   └── timeline.yml     (Your career/education history)
├── _layouts/
│   ├── default.html     (The main HTML shell)
│   └── post.html        (Layout for single blog posts)
├── assets/
│   ├── css/
│   │   └── style.css    (Your gradient styles)
│   └── js/
│       └── script.js    (The fade-in animation)
├── index.html           (The Timeline Homepage)
├── blog.html            (The Blog List)
└── _posts/              (Your actual updates)
    └── 2023-10-27-law-school-update.md
```

---

### Step 3: Copy-Paste The Code

#### 1. Site Configuration (`_config.yml`)
Create a file named `_config.yml`:
```yaml
title: "My Journey"
description: "Education and Career Timeline"
theme: jekyll-theme-prime # Optional fallback, but we will write custom CSS
url: "https://yourusername.github.io"
```

#### 2. The Timeline Data (`_data/timeline.yml`)
Create a folder named `_data` and a file inside called `timeline.yml`. This keeps your content clean.
```yaml
- title: "Started Law School"
  date: "August 2023"
  image: "https://via.placeholder.com/150" # Replace with your image URL
  description: "Began my JD journey at [University Name]. Focusing on Constitutional Law."

- title: "Paralegal Internship"
  date: "June 2022 - August 2022"
  description: "Worked at a local firm assisting with case research and client intake."

- title: "Graduated Undergrad"
  date: "May 2022"
  description: "Bachelor of Arts in Political Science. Graduated Magna Cum Laude."
```

#### 3. The Main Layout (`_layouts/default.html`)
Create a folder named `_layouts` and a file inside called `default.html`. This wraps every page.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }} | {{ site.title }}</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <nav>
        <a href="/">Timeline</a>
        <a href="/blog">Grantor Updates (Blog)</a>
    </nav>

    <main>
        {{ content }}
    </main>

    <footer>
        <p>&copy; {{ site.time | date: '%Y' }} {{ site.title }}</p>
    </footer>

    <script src="/assets/js/script.js"></script>
</body>
</html>
```

#### 4. The Post Layout (`_layouts/post.html`)
Inside `_layouts`, create `post.html` for your individual blog updates.
```html
---
layout: default
---
<article class="blog-post">
    <h1>{{ page.title }}</h1>
    <p class="meta">{{ page.date | date: "%B %d, %Y" }}</p>
    <div class="content">
        {{ content }}
    </div>
</article>
```

#### 5. The Timeline Page (`index.html`)
Create this file in the root directory. It loops through your data file.
```html
---
layout: default
title: Home
---

<header class="hero">
    <h1>My Journey</h1>
    <p>Education & Career Timeline</p>
</header>

<div class="timeline">
    {% for item in site.data.timeline %}
    <div class="timeline-item fade-in">
        <div class="timeline-content">
            <span class="date">{{ item.date }}</span>
            <h2>{{ item.title }}</h2>
            {% if item.image %}
            <img src="{{ item.image }}" alt="{{ item.title }}">
            {% endif %}
            <p>{{ item.description }}</p>
        </div>
    </div>
    {% endfor %}
</div>
```

#### 6. The Blog Page (`blog.html`)
Create this file in the root directory.
```html
---
layout: default
title: Updates
---
<div class="blog-container">
    <h1>Grantor Updates</h1>
    <ul class="post-list">
        {% for post in site.posts %}
        <li>
            <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
            <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
            <p>{{ post.excerpt }}</p>
        </li>
        {% endfor %}
    </ul>
</div>
```

#### 7. The Styling (`assets/css/style.css`)
Create folders `assets/css` and the file `style.css`. This includes the **Gradient** and **Fade** logic.
```css
/* General Reset */
body { font-family: 'Helvetica Neue', sans-serif; margin: 0; background: #f9f9f9; color: #333; line-height: 1.6; }
a { text-decoration: none; color: #4a90e2; }
nav { padding: 20px; text-align: right; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
nav a { margin-left: 20px; font-weight: bold; color: #333; }

/* Hero Section */
.hero { text-align: center; padding: 60px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }

/* Timeline Container */
.timeline { position: relative; max-width: 800px; margin: 40px auto; padding: 20px; }
/* The Vertical Line */
.timeline::after { content: ''; position: absolute; width: 4px; background: linear-gradient(to bottom, #667eea, #764ba2); top: 0; bottom: 0; left: 50%; margin-left: -2px; border-radius: 2px; }

/* Timeline Items */
.timeline-item { padding: 10px 40px; position: relative; width: 50%; box-sizing: border-box; opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
.timeline-item:nth-child(odd) { left: 0; text-align: right; }
.timeline-item:nth-child(even) { left: 50%; text-align: left; }

/* The Dot on the Line */
.timeline-item::after { content: ''; position: absolute; width: 20px; height: 20px; right: -10px; background: white; border: 4px solid #764ba2; top: 15px; border-radius: 50%; z-index: 1; }
.timeline-item:nth-child(even)::after { left: -10px; }

/* Content Card */
.timeline-content { padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.timeline-content img { max-width: 100%; border-radius: 5px; margin-top: 10px; }
.date { display: block; color: #764ba2; font-weight: bold; margin-bottom: 5px; }

/* Fade In Class (Added by JS) */
.timeline-item.visible { opacity: 1; transform: translateY(0); }

/* Blog Styles */
.blog-container, .blog-post { max-width: 700px; margin: 40px auto; padding: 20px; }
.post-list { list-style: none; padding: 0; }
.post-list li { margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
.post-link { font-size: 1.5rem; display: block; }
.post-date { color: #888; font-size: 0.9rem; }

/* Mobile Responsiveness */
@media screen and (max-width: 600px) {
  .timeline::after { left: 31px; }
  .timeline-item { width: 100%; padding-left: 70px; padding-right: 25px; }
  .timeline-item:nth-child(even) { left: 0%; text-align: left; }
  .timeline-item:nth-child(odd) { text-align: left; }
  .timeline-item::after { left: 21px; }
  .timeline-item:nth-child(odd)::after { left: 21px; }
}
```

#### 8. The Animation Script (`assets/js/script.js`)
Create folders `assets/js` and the file `script.js`.
```javascript
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const items = document.querySelectorAll('.fade-in');
    items.forEach(item => {
        observer.observe(item);
    });
});
```

---

### Step 4: Creating Blog Posts
When you need to update your grantors, simply create a new file in the `_posts` folder. The filename **must** follow this format: `YEAR-MONTH-DAY-title.md`.

Example: `_posts/2025-05-12-spring-semester-update.md`

Content of the file:
```markdown
---
layout: post
title: "Spring Semester 2025 Update"
date: 2025-05-12
---

I am happy to report that I have finished my Spring exams. My Constitutional Law grade was...

Here is a summary of my progress...
```

### How to Publish
1.  Commit all these files to your GitHub repository.
2.  Wait about 1-2 minutes.
3.  Visit `https://yourusername.github.io`.

You will see a timeline that animates in with a gradient theme as you scroll, and a "Grantor Updates" link in the navigation leading to your blog.