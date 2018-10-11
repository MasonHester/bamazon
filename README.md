# bamazon

## Description
This application is designed to interact with a mysql database using javascript through the command line.

### Tools used
- Javascript
- NPM
  - cli-table
  - inquirer
  - mysql
- Node
- MySQL
- MySQL Workbench

### How to use:
- If using the Virtual Machine provided
 - Instructions on setting up the VM are at the bottom of the README can be found in the README for the bamazon folder (root of the repo).
 - Establish a connection to MySQL/MySQL Workbench
![MySQL Workbench Connection](./assets/images/readme/mysqlConnection.png)
 - Run the schema.sql file
 - Run the seeds.sql file

### Options:
All of these commands should be run in the CLI, CTRL + C can exit if needed
Variables in between the |'s are placeholders, do not include the |'s in the search

- `node liri.js`
 - This is the main way to interact with the app. This will present you with a list of options for searching
- `node liri.js concert-this |artist name|`
 - This will allow you to search for concerts for a band using the Bands In Town API
  - Bands in Town API Link: http://www.artists.bandsintown.com/bandsintown-api
- `node liri.js spotify-this-song |song name|`
 - This will allow you to search for a song through the Spotify Api
  - Spotify API Link: https://developer.spotify.com/documentation/web-api/
- `node liri.js movie-this |movie name|`
 - This will allow you to get info for a movie through the OMDB API
  - OMDB API Link: http://www.omdbapi.com/
- `node liri.js do-what-it-says`
 - This will read a txt file and run the search on it
  - must be formatted as |action|,"|subject|"
  - Example: `concert-this,"The Rolling Stones"`

# Ubuntu Vagrant Shell

## Simple foundation for App development

### Requirements:
* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)

## Usage
This is intended to be a simple Ubuntu 16.04LTS server with Node 8 installed during provisioning. This can easily be extended to include other services like MySql, Mongo, React CLI, etc.

### Spin up the VM
After cloning the repository, change into the project directory (where `vagrantfile` is located) and issue the following command:

`vagrant up`

> Note: The first boot of your new VM will take a while, especially if this is ALSO the first time you're using the "box" that's configured in `vagrantfile` since it will need to be downloaded. After that, the provisioner will run a lot of scripts. **Don't panic if you see red** during the provisioning.

### Access the VM's terminal console
After the VM is finished booting and is provisioned, you can access the VM terminal with:

`vagrant ssh`

### File Mapping

The local `/code` folder in this project is automatically mapped to `/var/code` in the VM by default.

### Getting out of the VM
To exit the VM console, like any other SSH session, use the `exit` command.

### Turning VM off
`vagrant halt`

### Completely wipe the VM and start over 
`vagrant destroy` -> `vagrant up`

> Note: mounted files are unaffected by this operation)

## Windows & Virtualization
> **Important**: Windows machines will need to enable Virtualization if it has been disabled in the BIOS.

Virtualization must be enabled for Vagrant, and some Windows machines will disable this by default. To check this, open Task Manager then click Performance. Near bottom right Virtualization should be enabled. If it is not, this will need to be enabled in the BIOS before Vagrant will function correctly.

> **Note on NPM** - Windows users may need to use the `--no-bin-links` option of npm when installing/updating modules since Windows has some default permission settings that cause errors when creating symlinks. Running **Gitbash** explicitly as an Adminstrator may also help (shift-right click, "Run as Administrator"), but if not you can also open the Group Policy Editor (gpedit.msc) and enabled symlinks for all users under Computer Config -> Windows Settings -> Security Settings -> Local Policies -> User Rights Assignment -> Create Symbolic Links

## Custom Host Name
In order to access your VM outside the console, like in a web browser or database management tool, it's easiest to give your VM's `ip address` a **host entry** on your development machine.

Host Format:

`000.000.000.000 hostname.local`

Where the first part is a valid local IP Address, and the second is the name of the host. `.local` is common for development.

Add this line to your **hosts** file. Like many things, this depends on your Operating System

* **Mac / Linux** :  sudo nano /etc/hosts
* **Windows** : Open C:\Windows\System32\Drivers\etc\hosts in Text Editor (**with Admin permission**!)

You can test your Custom Host name (local) resolution with this command in a terminal:

`$ ping hostname.local`

Expected result is that the `hostname.local` resolves to the IP address you put in the hosts file. It does not matter if it times out, just that it resolves to the correct IP.