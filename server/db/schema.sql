-- DROP TABLE users, subscriptions, spots, user_subscriptions, user_spots CASCADE;
CREATE TABLE
    users (
        auth0_user_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(320) NOT NULL
    );

CREATE TABLE
    subscriptions (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (auth0_user_id)
    );

CREATE TABLE
    spots (
        surfline_id VARCHAR(300) PRIMARY KEY,
        spotname VARCHAR NOT NULL,
        spotRef VARCHAR,
        category VARCHAR,
        hasSpots BOOLEAN,
        liesIn VARCHAR NOT NULL,
        spotLocation JSONB,
        updatedAt VARCHAR,
        depth INT
    );




CREATE TABLE
    user_spots (
        user_id TEXT NOT NULL,
        spot_id TEXT NOT NULL,
        PRIMARY KEY (user_id, spot_id),
        FOREIGN KEY (user_id) REFERENCES users (auth0_user_id),
        FOREIGN KEY (spot_id) REFERENCES spots (surfline_id)
    );


CREATE TABLE 
    regions (
        id VARCHAR NOT NULL PRIMARY KEY,
        regionName VARCHAR NOT NULL,
        regionType VARCHAR NOT NULL,
        category VARCHAR,
        hasSpots BOOLEAN,
        liesIn VARCHAR NOT NULL,
        depth INT,
        updatedAt VARCHAR,
        latitude VARCHAR,
        longitude VARCHAR,
        fcode VARCHAR,
        fclName VARCHAR,
        fcodeName VARCHAR,
        enumeratedPath VARCHAR,
        subregionId VARCHAR
    );