# BETTI (Better than Tidia)
Small social website with AngularJS + Sails + JWT.

## EDIT: 

This was my first project with javascript and web apps! It was my first time with Sails, Angular, EJS etc. A lot of rookie mistakes here =)...

## Download + Installation

`$ cd betti`

`$ chmod +x RUNME_SUDO.sh`

`$ sudo RUNME_SUDO.sh`

`$ chmod +x RUNME.sh`
`$ RUNME.sh`


## Usage

Under betti/betti-sails you can:

`$sails lift`

Open CHROME or CHROMIUM and type:

`localhost:1337`

Available links for now:

`localhost:1337/userspace/profile`

`localhost:1337/adminspace/panel`

`localhost:1337/userspace/news`

NOTE: If you are using FIREFOX, use the signup page with CHROME 
because one tag "<dialog>" used on this page is not supported there.
Everything else should work just fine.


## Error checklist
Use this to look for errors.

`1- ./RUNME.sh is running properly?`

`2- betti-sails/config/connections.js is set?`

`3- Postgresql user is ok?`


## How authentication is working?

With JWT + passport. Special thanks to @carlospliego


## Contact us!
Decio					deciolauro@gmail.com

Eduardo Brunaldi		eduardo.brunaldi.santos@gmail.com

Paulo G. De Mitri		paulo.mitri@usp.br

