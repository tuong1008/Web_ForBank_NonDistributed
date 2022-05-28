# Web_ForBank_NonDistributed

This is a pack of frontend web (HTML, CSS, JS) and backend RESTFul API (Java Servlet)

## Installation
System requirements:
+ Node
+ Docker Desktop

In project directory,

install backend
```bash
docker build -t bank-backend-docker .
docker compose up
```
install frontend
```bash
npm install
node server.js
```

## Usage

In browser, type:
```browser
localhost:8080/web_forbank
Expect: Web service is running!

localhost:8080/web_forbank/test
Expect: Ket noi DB thanh cong!
```

```browser
localhost:5000
Expect: Show web!
```

Account DEMO:

+ adminCN1
Admin1234.
+ adminCN2
Admin1234.
+ adminNH1
Admin1234.
+ adminNH2
Admin1234.
