 #Spike
 This project shows the ability to use a firebase storage to manage downloads. In this file, you can upload anything to my filestore bucket, and recieve the paths in turn.
 The paths are saved on the session, (and can be stored in a database.) They can almost be used to download a fresh copy. Currently there is an error about a missing header, 'Access-Control-Allow-Origin'.

 ###setup
 - fork and clone
 - run npm install. Several of the depenedancies are unnessesary for the functionality of this spike, but were involved at some point for some approach.
 - npm start
 
 ###features
 The big box uploads files to my storage bucket. More complicated files must be uploaded as .zips. Everything you upload will show up on the dom until you refresh. Clicking the button would download it, but that is currently broken due to the missing header.