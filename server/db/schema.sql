-- DROP TABLE users, subscriptions, spots, user_subscriptions, user_spots CASCADE;

CREATE TABLE users (
    auth0_user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    email VARCHAR(320) NOT NULL
);

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY ,
    data JSONB NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(auth0_user_id)
);

CREATE TABLE user_subscriptions (
    user_id TEXT NOT NULL,
    subscription_id INT NOT NULL,
    PRIMARY KEY (user_id, subscription_id),
    FOREIGN KEY (user_id) REFERENCES Users(auth0_user_id),
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

CREATE TABLE spots (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(auth0_user_id)
);

CREATE TABLE user_spots (
    user_id TEXT NOT NULL,
    spot_id INT NOT NULL,
    PRIMARY KEY (user_id, spot_id),
    FOREIGN KEY (user_id) REFERENCES users(auth0_user_id),
    FOREIGN KEY (spot_id) REFERENCES spots(id)
);