# biofeature project

## Backend Setup
```bash
# 1st. shell, for deepface
git clone https://github.com/serengil/deepface.git
cd deepface/scripts
./dockerize.sh
# 2nd. shell, for openface
docker pull bamos/openface
docker run -p 8000:8000 --mount type=bind,source=<DATADIR>/data,target=/data -it bamos/openface /bin/bash
# in openface docker, for django
pip install django
git clone https://github.com/awarenessMiao/biofeature-backend
cd biofeature-backend
python manage.py runserver
```

## Frontend setup
```
git clone https://github.com/awarenessMiao/biofeature-frontend
cd biofeature-frontend
npm install
npm run serve
```

Then open http://127.0.0.1:8080/