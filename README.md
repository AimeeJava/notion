
                                Description

The note taking app stores the original markdown text, with no user login and users are identified via a random session token. The frontend uses vanilla JavaScript and the backend uses php to connect to MySQL database.

                                Solution

1.  Initialize session token. On first visit, generate a 32 byte random value, hex-encode to a 64 char string, store it as the note_token cookie (7-day expiry). All note operations use this token as the user identifier.
2.  Set up the database. Create a notes table that stores every save as a new row.
3.  Implement JSON async endpoints (public/async): save.php uses POST method, accept content from JSON/form and inserts a new row into notes table; latest.php uses GET method, read note_token and fetch newest row for that token; doc.php ues GET method, validate id and fetch snapshot by id.
4.  Build the single-page UI: refered to Hackathon1, a live preview textarea. It use fetch() to call the async endpoints. After save, display Saved! Shareable ID: <id> and enable copy-link behavior.

