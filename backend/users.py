# Hardcoded user credentials used for authentication.
# In a real application these would live in a database with hashed passwords.
USERS = {
    "admin": "password123",
    "john": "john123",
}


def check_credentials(username, password):
    return username in USERS and USERS[username] == password
