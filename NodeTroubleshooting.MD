Node Troubleshooting
====================

### Error: ... ENOENT
This usually means it cannot run the specified command.  
Check the following:  
* Use the FULL PATH to the file. You can never rely on the PATH in a program. It will work today and break tomorrow.
* Does the user/group/everyone have execute permission? Start wide and narrow it down if it works.
* Does the user/group/everyone have read permission to the command and the folder it is in?
