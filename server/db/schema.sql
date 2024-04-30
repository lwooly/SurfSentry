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
        surfline_id VARCHAR(255) PRIMARY KEY,
        spotname VARCHAR(255)NOT NULL,
        spot_ref VARCHAR,
        category VARCHAR,
        has_spots BOOLEAN,
        lies_in VARCHAR NOT NULL,
        spot_location JSONB,
        updated_at VARCHAR,
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
    spots (
        surfline_id VARCHAR(255) PRIMARY KEY,
        spotname VARCHAR(255)NOT NULL,
        spot_ref VARCHAR,
        category VARCHAR,
        has_spots BOOLEAN,
        lies_in VARCHAR NOT NULL,
        spot_location JSONB,
        updated_at VARCHAR,
        depth INT
    );


CREATE TABLE 
    regions (
        id VARCHAR(255)NOT NULL PRIMARY KEY,
        region_name VARCHAR(255) NOT NULL,
        region_type VARCHAR(255) NOT NULL,
        category VARCHAR,
        has_spots BOOLEAN,
        lies_in VARCHAR,
        depth INT,
        updated_at VARCHAR,
        latitude VARCHAR,
        longitude VARCHAR,
        fcode VARCHAR,
        fcl_name VARCHAR,
        fcode_name VARCHAR,
        enumerated_path VARCHAR,
        subregion_id VARCHAR
    );

    CREATE TABLE forecasts (
        spot_id VARCHAR(300) NOT NULL,
        forecast JSONB NOT NULL,
        PRIMARY KEY(spot_id),
        FOREIGN KEY (spot_id) REFERENCES spots (surfline_id)
    );