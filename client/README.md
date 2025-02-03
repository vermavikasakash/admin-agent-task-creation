# Getting Started with Create React App

This project is made with React and project name is MACHINE TEST

## Available Scripts

 To start the application you can run:

### `npm start`

# On Successful run

User will land on to the login page.

# Credentials for login

Admin login - id : admin@gmail.com , password : Qa12345@

User/Agent login - 
id : sonu@gmail.com , password : Qa12345@
id : vikas@gmail.com , password : Qa12345@
id : nisth@gmail.com , password : Qa12345@

# If email is not registered and user tries to to login

User will get error "Email is not registered"

# If password is not wrong and user tries to to login

User will get error "Invalid password"

# If credentials are correct for login

User will get success message "Successfully Login"

# If user is agent, on successful login, user will be redirect to Dashboard page

On Dashboard page, agent (normal user) can see all the tasks assigned to him and to other agent as well.

On Dashboard page, agent (normal user) can see "View Agent" option, there he can see all the agents/user except admin name

# If user is admin, on successful login, user will be redirect to Dashboard page

On Dashboard page, admin can see all the tasks assigned to all the agent.
On Dashboard page, admin will see 3 option  "View Agent", "Create Agent",  "CreateTask".
Create task and "Create Agent" is only assigned to admin.
# Create Agent
-1) Click on to "Create Agent", a new screen will get opened to create agent
-2) Create Agent screen has 4 mandatory field, i.e Name, Email(unique), Mobile, Password
-3) If any of the above mentioned field is empty, admin wont be able to create agent
-4) If all the fields are correct, agent/user will get created Successfully and admin will be redirected to view agents page
# Create Task
-1) Click on to "Create Task", a new screen will get opened to create tasks
-2) Create Tasks screen have the following fields
    i) Download the task Template button - onclick to download an excel sheet will get downloaded
    ii) Upload file option - once the admin have filled all the mandatory field in the downloaded excel sheet, he can upload the same file to create task
    iii) Upload task button - initially this button is disabled, once the admin have uploaded the correct file, it will get enabled, to upload the task
    iv) Table to show selected task from file - once file has chosen, it will reflect the details present in excel sheet
-3) If all file format and file is correct (downloaded excel sheet), on click to upload all the tasks will get created against the present agents
-4) Creation of task against each user follows "round-robin" concept to deliver the task based on the requirement.
-5) On successful upload admin will be redirected to "view task "screen, here he will get the uploaded data.    

# For logout on Header menu, logout option is present and onclick to logout

User will get success message "Logged out Successfully"



