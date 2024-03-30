# Build a Full Stack Application: Visitor Guestbook

## Overview

There are quite a few moving parts in a full stack application, but it's possible to build a reasonably simple application to demonstrate all of these core concepts. As you've been working with HTML, CSS, client side JavaScript, and now server-side JavaScript and databases, it should be possible to build a website with a functional visitors guestbook or comment form, that saves to a database and allows a conversation to occur.

We're going to put together the user stories and some guidelines, and then you're on your own for this one!

Here is an example!

## Class Plan

  * Demo: A look at the final project guestbook  
  * Workshop: Build a website with a full stack component, using a simple API to send and receive data from an API server  

## Required Knowledge

  * HTML  
  * CSS  
  * JavaScript: Events, Fetch, DOM manipulation, Async/Await
  * Node.js: Express server and routing
  * Databases: SQL, SQLite (better-sqlite3)

## Workshop

### User Stories

    🐿️ As a user, I want to visit the website and read the information on my phone or computer  
    🐿️ As a user, I want to be able to leave a message in the guestbook  
    🐿️ As a user, I want to be able to see all of the messages that have been left in the guestbook  

### Requirements

  * Create a page containing a form to leave a message and a list of all the messages that have been left.

  * Style the form and the messages so they're easy to read on multiple kinds of device.

  * Create an API POST route to accept the text from your message input form

  * Create a database to store the messages, and create a seed file to create the table

  * Create an API GET route to retrieve all the messages from the database

  * Fetch the messages from your API in the browser and display them on the page.
  
### Stretch Goals

  * Add a delete button to each message, that sends a request to the server to delete the message

  * Add a like button to each message, that sends a separate request to the server to increment the likes on the message  
