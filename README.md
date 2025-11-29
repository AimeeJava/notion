
                                Description

The note taking app stores the original markdown text, with no user login and users are identified via a random session token. The frontend uses vanilla JavaScript and the backend uses php to connect to MySQL database.

                                Solution

1.  Initialize session token. On first visit, generate a 32 byte random value, hex-encode to a 64 char string, store it as the note_token cookie (7-day expiry). All note operations use this token as the user identifier.
2.  Set up the database. Create a notes table that stores every save as a new row.
3.  Implement JSON async endpoints (public/async): save.php uses POST method, accept content from JSON/form and inserts a new row into notes table; latest.php uses GET method, read note_token and fetch newest row for that token; doc.php ues GET method, validate id and fetch snapshot by id.
4.  Build the single-page UI: refered to Hackathon1, a live preview textarea. It use fetch() to call the async endpoints. After save, display Saved! Shareable ID: <id> and enable copy-link behavior.

                                Test cases

Test case 1:
Input: abdefgghh
click save button
Output: abdefggh
Saved! Shareable ID:1
Test case 2:
Input: #Head - 1 - 2
Output: <h1>Head</h1>

<li>1</li>
<li>2</li>

Test case 3:
Input: # Test ## Subtitle
_I'm a_
**Notice**
[link1](http://123.com)
click Copy Share Link
Output: <h1>Test</h1>

<h2>Subtitle</h2>
<em>I'm a</em> <strong>Notice</strong>
pop up notice: 127.0.0.1:8000 says Shareable link copied to clipboard!

Reference
[1]php.net, https://www.php.net/manual/en/function.bin2hex.php
[2]PHP MySQL Prepared w3schools, https://www.w3schools.com/php/php_mysql_prepared_statements.asp
[3]Hackathon 1, 2025, index.html, editor.js

                                Academic Integrity Statement

                                <!--

I certify that this submission represents my own independent work.
I have not used AI tools, code generators, validators, or external assistance.
I understand this activity is designed to demonstrate my understanding
of front-end and back-end development using HTML, CSS, JS, and Node.js (core modules).
I have neither provided nor received unauthorized help.

Signed:

Aimee Li, B00949956
-->
