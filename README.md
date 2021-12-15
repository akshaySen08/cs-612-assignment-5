# Students Api

Some data of students and their respective subjects and marks.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.0.0

    $ npm --version
    6.14.14

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/akshaysen08/cs-612-assignment-5
    $ cd cs-612-assignment-5
    $ yarn install


## Running the project

    $ yarn start

## Simple build for production

    $ yarn build

---------------------------------------------------------------------------------------------------------------------------------------------

# Docker: student-apis-container

Showing the list of students with options to view their subjects taken and got marks respectively.

## Getting Started

These instructions will cover usage information and for the docker container 

### Prerequisities

In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

#### Container Parameters

Steps to Build and Run a Docker image and container

### BUILD
```shell
sudo docker build -t akshaysen08/assignment-5-612
```

 
### RUN
```shell
docker run --name student-apis-container -p 80:9000 -d akshaysen08/assignment-5-612
```

To restart your container

```shell
docker restart student-apis-container
```


## Built With

* VsCode

## Authors

* **Akshay Sen/ Chandani Reddy** - *Initial work* - [akshaysen08](https://github.com/akshaysen08)



## Acknowledgments

* Digital Ocean
* Docker Hub
