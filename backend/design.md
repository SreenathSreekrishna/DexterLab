# Design for backend

## db design

1. **users** - uID, uName, uMail, uPwd, uBalance, uVerified
2. **employees** - eID, eName, eMail, ePwd
3. **parts** - pID, pName, pDesc, pLabour, pStock, pNumber
4. **inventions** - iID, iName, iCreator, iParts
5. **analytics** - aID, type, name, numSold
6. **carts** - cID, uID, iID

## endpoints

### users

1. **/api/register** - POST
Takes input **uName**, **uMail**, **uPwd**
process data and insert in db
send email to **uMail** to check if exists

2. **/api/login** - POST
**NOTE - endpoint will be called when every login protected page is opened**
Takes input **uMail**, **uPwd** or **cookies**
session cookie will contain encrypted and hashed pwd and uid
if session cookie is not empty use cookie to authorize
else use **uMail** and **uPwd** to authorize

3. **/api/verify/<code>** - GET
code will be verification code
find username from code and update verif. status in db

4. **/api/getUsers** - GET
checks if admin from cookie
if admin then return user data