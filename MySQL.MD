# MySQL

### Using a subquery in an UPDATE is SLOW!!!
[Stack Overflow](https://stackoverflow.com/questions/3147598/mysql-update-query-with-subquery-taking-forever)

DO NOT do this:
```mysql
UPDATE file_integrity_monitor.files SET status='archive' WHERE id IN (SELECT file_id FROM file_integrity_monitor.issues_to_files WHERE issue_id = 12345)
```

Instead, do this:  
```mysql
UPDATE file_integrity_monitor.files LEFT JOIN file_integrity_monitor.issues_to_files ON issues_to_files.file_id = files.id SET status='archive' WHERE issue_id = 12345
```  

This doesn't really apply to SELECT statements, but somehow they are different.

Using the sub-query method may also result in deadlocks if you are using a pool!

---

### Find Duplicates in a column
[Stack Overflow](https://stackoverflow.com/questions/688549/finding-duplicate-values-in-mysql)
`SELECT name, COUNT(*) c FROM table GROUP BY name HAVING c > 1;`