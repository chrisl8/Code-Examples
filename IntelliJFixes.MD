IntelliJ IDEA
=============

I use Intellij Ultimate as an IDE. I love vim, but I find working in a GUI based IDE that can seamlessly handle JavaScript, Python, PHP, bash, Perl, etc. is something I really enjoy.  
With a huge IDE comes crazy config issues though, so here are some fixes and standard setups I use.

### Do not trim whitespace on MarkDown files
If you have IntelliJ set up to trim whitespace it happily does so on markdown files too, wiping out your carefully crafted line breaks.  
To fix this:
1. Create a file called .editorconfig in the root of your project.
2. Add the following text to it:  
```
[*.{md,MD}]
trim_trailing_whitespace = false
```
3. Restart your project. When you first open a markdown file it should give you some notice about editorconfig controlling it.

### SQL queries not recognized in Python
If IntelliJ is confused by the SQL quries in Python code you may need to go to:  
* Settings
  * Tools
    * Database
      * User Parameters
        CHECK: "Enable in string literals with SQL injection"


### Laravel
See LaravelInit.MD
