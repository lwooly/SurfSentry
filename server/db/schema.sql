
CREATE TABLE Users (
    auth0_user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    email VARCHAR(320) NOT NULL,
);

CREATE TABLE Subscriptions (
    id SERIAL PRIMARY KEY ,
    data JSONB NOT NULL,
    FOREIGN KEY (user_auth0_user_id) REFERENCES Users(auth0_user_id)
);

CREATE TABLE Spots (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    FOREIGN KEY (users) REFERENCES Users(auth0_user_id)
)