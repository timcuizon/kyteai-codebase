# mindtrees interpretation web services

# How to run webservice

python -m venv venv

1. In the Interpretation directory, Create Virtual Environment (e.g. using base python `venv`):

```bash
    python -m venv venv
```

2. Activate virtual environment

```bash
    venv\Scripts\activate
```

```
    1. Ctrl + P, then "Select Interpreter" > "Enter Interpreter Path"
    2. Input the directory of venv/Scripts. You can just copy path the `Scripts` folder
    3. Restart you terminal and you should see (venv) e.g.
        $ source E:/Kyte-Ai/mindtrees/Services/Interpretation/venv/Scripts/activate
        (venv)
```

3. Install all the recommended libraries, packages, and dependencies (Upon cloning only)

```
    pip install -r requirements.txt
```

3. To run a webservice. On the terminal

```
    set FLASK_APP=app.py
    flask run
```

4. Everytime you have changes in your service, you need to prompt

```
    flask run
    or
    Ctrl + C        //In a terminal where service is running
    flask run
```

5. (Optional) If you are in a development environment, you can set the FLASK_ENV environment variable to development

```
    FLASK_ENV=development
```

6. After installing all the packages you need, it is recommended to create a list of dependencies or package list for the developers to install in their environment. To do this run the ff code.
   a. In the same directory, enter “pip freeze > requirements.txt “ //You can change the requirements name.
