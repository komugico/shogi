import os

project_root = os.getcwd()
os.chdir(os.path.join(project_root, "resources", "react"))
os.system("npm run build")
os.chdir(project_root)
os.system("python manage.py collectstatic --noinput")