# mtto_monitoring_service
Application use to monitoring variables of PLC´s brand DELTA
---
## Enviroment configuration

### NODE
#### Install   
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22
```
### GIT
#### Install
```bash
apt-get install git
```
---

## intalation
```bash
git clone https://github.com/Julian-Saave/mtto_monitoring_view.git
cd mtto_monitoring_view
npm install
```

## use

```bash
npm run dev --development execution
npm run start --production execution
```

## enviroment variables
| Variable                      | Description        |
| ----------------------------- | ------------------ |
| `VITE_API_URL_MONITORING`     | Address of backend |


## features
technologies used: reack.js, vite, tailwinds
