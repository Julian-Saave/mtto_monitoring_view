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
git clone https://github.com/Julian-Saave/mtto_monitoring_view.git #Copy repository
cd mtto_monitoring_view
npm install #Install dependencies
npm run build #Create folder production
npm install -g serve #Install server
npm install -g pm2 #Install services manager
pm2 start "serve -s dist -l 8080" --name mtto_monitoring_view #add service
pm2 save #Save changes
pm2 startup #Generate command
#Copy and paste generate comand
#Example:
#sudo env PATH=$PATH:/home/est04/.nvm/versions/node/v22.17.0/bin /home/est04/.nvm/versions/node/v22.17.0/lib/node_modules/pm2/bin/pm2 startup systemd -u est04 --hp /home/est04


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
