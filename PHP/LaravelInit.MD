# Laravel

### IDE Helper
[Laravel IDE Helper](https://github.com/barryvdh/laravel-ide-helper)  
See the "Install" section, but here is the latest of what I did:  

In IntellJ:
Settings->PHP->
    PHP language level: 7.2 (Or whatever Laravel `composer.json` says now)
    CLI Interpreter: <no interpreter>
->Laravel->
    CHECK both "Enable plugin..." and "Use AutoPopup..."
    
Edit `app/Providers/AppServiceProvider.php` and update the register function:
```php
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
        // ...
    }
```

Invalidate Cache and Restart IntelliJ
```shell script
cd <your laravel folder>
composer require barryvdh/laravel-ide-helper
php artisan clear-compiled
php artisan ide-helper:generate
php artisan ide-helper:meta
composer update
```

Now start your project again in IntelliJ

At this point if you should be able to jump from a Controller Method listing in a Route to the method. If not, it didn't work.

Note you may have to do these again sometimes:
```shell script
php artisan clear-compiled
php artisan ide-helper:generate
php artisan ide-helper:meta
composer update
```

## Security
### After you get it going, be sure to DELETE:
`public/js/app.js`  
This script has some security issues, and it just Example code.

### Add Middleware/SecureHeaders.php to add some trivial but often requested "security" headers.
And add it to Kernel.php under $middleware
`\App\Http\Middleware\SecureHeaders::class,`  

### Set  
`    'secure' => env('SESSION_SECURE_COOKIE', true),
`  
in Session.php IF the site is HTTPS,
otherwise, do NOT set this!

## Updating

Run `composer outdated` to see what is out of date.
Typically you can then just run `composer update` to update things.
This won't push up a big Laravel version update though.
For that:
1. Go to https://laravel.com/docs/5.8/upgrade (or whatever the latest version is) and see if there are any big breaking changes.
2. Change the laravel version in compser.json and/or **compare** your composer.json file to `https://github.com/laravel/laravel/blob/master/composer.json` and true it up.  Remember to leave any packages you added by hand on purpose.
3. Run `composer update`

If `composer update` notes things that are outdated in `composer.json` itself, but it matches the one in Laravel's Github repo, then ignore it. We do not want to break Laravel.

## Errors
If you get the error:  
`InvalidArgumentException  : Please provide a valid cache path.`  
From your Laravel folder run:
`mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache storage/logs`  
NOTE: You may have to fix permissions on these too to make them world read/writeable or whatever it take to let your Apache instance write to them.  
`chmod o+rw -R storage`
`chmod o+rw -R bootstrap/cache`
