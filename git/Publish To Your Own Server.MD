### "Publish" a git repo to your own server:

I often start up a git repo to work on small projects with just:
git init

These are "work" repos. The kind of repo you push/pull on is a "bare" rep.
You can make one like this on the remote machine:
git init --bare

Then you can set that repo to be a remote for your working repo:
git remote add backup ssh://<username>@<hostname.fqdn.com>:/home/<username/<bareGitRepoLocation>

and then set up the defaults for easy pushing:
git push --set-upstream backup master

and now you can run `git push` to push your repo there,
and you can also clone from it elsewhere.
