# Hey there Cutie!

So youre blogging I see! Here's a little manual to remind you how to run your blog.
Lines starting with "$" denotes arguments to be put into terminal.

How to get to your blog:
$ blog

How to make a new post:
$ new-post "Name of post"

How to run blog locally on localhost:4000
$ jekyll serve

How to add changes to commit
$ git add .

How to commit changes
$ git commit -m "Message describing your posts"

How to update your actual blog
$ git push

How to stop the localhost server
1. Go into the terminal window where its running
Press CTRL+c

After editing _config.yml you have to do $ jekyll serve or $ jekyll build 

# THE SYNTAX

## Markdown
The syntax you'll be writing your posts in is called [Markdown](https://daringfireball.net/projects/markdown/syntax)

## Meta Info
The syntax of the meta info at the top of your post is used to generate specific data on your post, author is used to put the author on the page, tags is used to link the post to other posts
---
layout: post
title: 312 Main
tags: [economy, wow, js]
author: "Thea Zerbe"
---
