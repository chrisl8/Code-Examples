Ubuntu
======

# YouCompleteMe vim extention on 16.04
You may get this error:
```
YouCompleteMe unavailable: This package should not be accessible on Python 3. Either you are trying to run from the python-future src folder or your installation of python-future is corrupted.
```
The issue is that the defautl vim on Ubuntu 16.04 uses Python 3, and YouCompleteMe only works with 2.

One fix is to use the "alternatives" system to point vim to /usr/bin/vim.nox-py2:
```
$ sudo update-alternatives --config vim
There are 2 choices for the alternative vim (providing /usr/bin/vim).

  Selection    Path                  Priority   Status
------------------------------------------------------------
* 0            /usr/bin/vim.nox       40        auto mode
  1            /usr/bin/vim.nox       40        manual mode
  2            /usr/bin/vim.nox-py2   39        manual mode

Press <enter> to keep the current choice[*], or type selection number: 2

```
I think this wil "stick". If not I'll update this.

