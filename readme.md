# Safari Cookie PoC

## Setup

You need to setup two virtual hosts in whichever web server you use with the domains:

- `example1.com` to point to `/parent`
- `example2.com` to point to `/child`

The virtual host for `example2.com` also needs CORS setup (for origin `http://example1.com`) to allow for the JSON/XHR test to work.

### Example configs

These are for nginx

#### example1.com

```nginx
server {
    listen       80;
    server_name  example1.com;
    root         /path/to/this/repo/parent;
    index        index.php index.html index.htm;
    autoindex    on;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
}
```

#### example2.com

```nginx
server {
    listen       80;
    server_name  example2.com;
    root         /path/to/this/repo/child;
    index        index.php index.html index.htm;
    autoindex    on;

    location / {
        try_files $uri $uri/ /index.php?$query_string;

        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'http://example1.com';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        if ($request_method = 'POST') {
            add_header 'Access-Control-Allow-Origin' 'http://example1.com';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        }

        if ($request_method = 'GET') {
            add_header 'Access-Control-Allow-Origin' 'http://example1.com';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        }
    }
}
```
