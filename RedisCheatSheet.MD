REDIS
=====

### Brief test of Node interface
[GitHub](https://github.com/NodeRedis/node_redis)  
`node`
```
> var redis = require('redis');
undefined
> var client = redis.createClient();
undefined
> client.rpush("message", "hi");
true
> client.rpush("message", "0");
true
>
(To exit, press ^C again or type .exit)
>
chrisl8@ekpyroticfrood (untested) server $ redis-cli
127.0.0.1:6379> lindex "message" 0
"hi"
127.0.0.1:6379> lindex "message" 1
"0"
127.0.0.1:6379> lindex "message" 2
(nil)
127.0.0.1:6379>
```

### Command line
`redis-cli`

### List All Keys
`KEYS *`

### Delete all Keys with a given prefix
[Stack Overflow](http://stackoverflow.com/a/16974060)  
`EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 prefix:*`