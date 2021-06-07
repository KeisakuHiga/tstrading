CREATE TABLE signal_events
(
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  product_code VARCHAR(100),
  side VARCHAR(100),
  price NUMERIC,
  size NUMERIC,
  PRIMARY KEY(time)
);

CREATE TABLE btc_jpy_second
(
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  open NUMERIC,
  close NUMERIC,
  high NUMERIC,
  low NUMERIC,
  volume NUMERIC,
  PRIMARY KEY(time)
);

CREATE TABLE btc_jpy_minute
(
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  open NUMERIC,
  close NUMERIC,
  high NUMERIC,
  low NUMERIC,
  volume NUMERIC,
  PRIMARY KEY(time)
);

CREATE TABLE btc_jpy_hour
(
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  open NUMERIC,
  close NUMERIC,
  high NUMERIC,
  low NUMERIC,
  volume NUMERIC,
  PRIMARY KEY(time)
);

CREATE TABLE btc_jpy_day
(
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  open NUMERIC,
  close NUMERIC,
  high NUMERIC,
  low NUMERIC,
  volume NUMERIC,
  PRIMARY KEY(time)
);
