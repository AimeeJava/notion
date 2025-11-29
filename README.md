
                                Description

The note taking app stores the original markdown text, with no user login and users are identified via a random session token. The frontend uses vanilla JavaScript and the backend uses php to connect to MySQL database.

                                Solution

1.  Initialize session token. On first visit, generate a 32 byte random value, hex-encode to a 64 char string, store it as the note_token cookie (7-day expiry). All note operations use this token as the user identifier.
2.  Set up the database. Create a notes table that stores every save as a new row.
3.  Implement JSON async endpoints (public/async): save.php uses POST method, accept content from JSON/form and inserts a new row into notes table; latest.php uses GET method, read note_token and fetch newest row for that token; doc.php ues GET method, validate id and fetch snapshot by id.
4.  Build the single-page UI: refered to Hackathon1, a live preview textarea. It use fetch() to call the async endpoints. After save, display Saved! Shareable ID: <id> and enable copy-link behavior.

                          How to run this system
Set the website’s document root to the public directory under this project. For example, on Windows, after entering the project directory, you can run:
php.exe -S 127.0.0.1:8000 -t public
This will start a test HTTP server.
In addition, you need to start the MySQL database, for example by running:
.\mysqld.exe --datadir=C:\mysql\data
You can also configure the DocumentRoot variable in XAMPP’s Apache server configuration to point to the correct directory, and then start the MySQL service.

When the user clicks the Save button, they will see a prompt message such as: “Saved! Shareable ID: 1”.
After clicking Save, because a shareable ID is generated, the Copy Share Link button becomes enabled.
When the user enters Markdown text, the site automatically detects the formatting and renders it as HTML in the Preview area.
Supported Markdown formats include headings, subheadings, bold, italics, hyperlinks, and unordered lists.
If you don’t save while writing, clicking Load Latest will restore the content from the last saved version.
<img width="317" height="403" alt="image" src="https://github.com/user-attachments/assets/bace5341-267c-47eb-8738-3479730fb3df" />
<img width="468" height="264" alt="image" src="https://github.com/user-attachments/assets/94d1eae8-cd18-416c-983c-f763024e098b" />

