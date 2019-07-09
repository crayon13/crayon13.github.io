---
layout: page
title: About
---

[겸군은](/about/2019/04/02/profile.html) 참고 부탁드려요!

<div id="about">
    <ul class="posts">
        {% for post in site.posts %}
        {% if post.category == "about" %}
        <li><a href="{{ post.url }}">{{ post.title }}</a><span> &raquo; {{ post.date | date: "%B %d, %Y" }}</span></li>
        {% endif %}
        {% endfor %}
    </ul>
</div>
