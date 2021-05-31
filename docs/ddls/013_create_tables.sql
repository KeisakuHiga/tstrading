CREATE TABLE signal_events
(
  time TIMESTAMP NOT NULL,
  product_code VARCHAR(100),
  side VARCHAR(100),
  price NUMERIC,
  size NUMERIC,
  PRIMARY KEY(time)
);

CREATE TABLE btc_jpy_1s
(
  time TIMESTAMP NOT NULL,
  open_price NUMERIC,
  close_price NUMERIC,
  high_price NUMERIC,
  low_price NUMERIC,
  volume NUMERIC,
  PRIMARY KEY(time)
);

CREATE TABLE btc_jpy_1m
(
  time TIMESTAMP NOT NULL,
  open_price NUMERIC,
  close_price NUMERIC,
  high_price NUMERIC,
  low_price NUMERIC,
  volume NUMERIC,
  PRIMARY KEY(time)
);

CREATE TABLE btc_jpy_1h
(
  time TIMESTAMP NOT NULL,
  open_price NUMERIC,
  close_price NUMERIC,
  high_price NUMERIC,
  low_price NUMERIC,
  volume NUMERIC,
  PRIMARY KEY(time)
);
