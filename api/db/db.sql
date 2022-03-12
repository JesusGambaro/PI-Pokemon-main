CREATE DATABASE pokemon;

CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR (50) UNIQUE NOT NULL,
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    defense INTEGER NOT NULL,
    speed INTEGER NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS types(
    id SERIAL PRIMARY KEY,
    type_name VARCHAR (50) UNIQUE NOT NULL
);